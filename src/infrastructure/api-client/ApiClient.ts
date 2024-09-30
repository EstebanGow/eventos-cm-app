import { injectable } from 'inversify';
import 'reflect-metadata';
import axios from 'axios';
import { ApiClientRest } from '@domain/api';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { RedisGuiaRepository } from '@infrastructure/repositories/redis';
import { IDireccion, IEvento } from '@application/data';
import { TOKEN_MAPBOX, URL_MAPBOX } from 'util/Envs';

@injectable()
export class ApiClient implements ApiClientRest {
    private redisClient = DEPENDENCY_CONTAINER.get<RedisGuiaRepository>(TYPES.RedisGuiaRepository);

    async ubicacionesCercanas(evento: IEvento): Promise<any> {
        try {
            let LugaresCercanos = await this.redisClient.getOne(`ciudad`);
            if (!LugaresCercanos) {
                const response = await axios({
                    method: 'post',
                    url: ``,
                    data: {
                        codigosCiudades: [
                            {
                                codigoCiudad: evento,
                            },
                        ],
                    },
                });
                LugaresCercanos = response.data.data[0];
                this.redisClient.insertOne(LugaresCercanos, `ciudad-`);
            }
            return { LugaresCercanos };
        } catch (e: any) {
            throw new Error('Ciudades', e.toString());
        }
    }

    async obtenerCoordenadas(direccion: IDireccion): Promise<any> {
        try {
            const response = await axios({
                method: 'get',
                url: `${URL_MAPBOX}${direccion.direccion},${direccion.ciudad}&country=CO&access_token=${TOKEN_MAPBOX}`,
            });
            const data = response.data;
            console.log(data);
            return { data };
        } catch (e: any) {
            throw new Error('Ciudades', e.toString());
        }
    }
}

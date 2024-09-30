import { injectable } from 'inversify';
import 'reflect-metadata';
import axios from 'axios';
import { ApiClientRest } from '@domain/api';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { RedisGuiaRepository } from '@infrastructure/repositories/redis';
import { IDireccion, IEvento } from '@application/data';
import { TOKEN_MAPBOX, URL_MAPBOX } from '@util';

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
            const direccionUrl = encodeURIComponent(direccion.direccion);
            const response = await axios({
                method: 'get',
                url: `${URL_MAPBOX}${direccionUrl},${direccion.ciudad}Colombia.json?access_token=${TOKEN_MAPBOX}`,
            });
            const data = response.data;

            return { longitude: data['features'][0]['center'][0], latitude: data['features'][0]['center'][1] };
        } catch (e: any) {
            throw new Error('Ciudades', e.toString());
        }
    }
}

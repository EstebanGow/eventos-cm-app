import { injectable } from 'inversify';
import 'reflect-metadata';
import axios from 'axios';
import { ApiClientRest } from '@domain/api';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { RedisEventosRepository } from '@infrastructure/repositories/redis';
import { IEventoOut, ILugaresCercanos } from '@application/data/out/IEventoOut';
import { IDireccion } from '@application/data';
import { API_KEY } from '@util';

@injectable()
export class ApiClient implements ApiClientRest {
    private redisClient = DEPENDENCY_CONTAINER.get<RedisEventosRepository>(TYPES.RedisEventosRepository);
    async ubicacionesCercanas(evento: IEventoOut): Promise<ILugaresCercanos[]> {
        try {
            const claveRedis = `${evento.id}`;
            await this.redisClient.deleteSource(claveRedis);
            let lugaresCercanos = await this.redisClient.getOne(claveRedis);
            if (!lugaresCercanos) {
                lugaresCercanos = await this.lugaresCercanosGoogle(evento.direccion.latitud, evento.direccion.longitud);
                this.redisClient.insertOne(lugaresCercanos, claveRedis);
                return lugaresCercanos;
            }
            return Object.values(lugaresCercanos);
        } catch (e: any) {
            throw new Error('Ubicaciones cercanas', e.toString());
        }
    }

    async obtenerCoordenadas(direccion: IDireccion): Promise<any> {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: direccion.direccion,
                    key: API_KEY,
                },
            });

            if (response.data.status === 'OK') {
                const { lat, lng } = response.data.results[0].geometry.location;
                return { latitude: lat, longitude: lng };
            }
            throw new Error(`Localizacion Fallida. Estado: ${response.data.status}`);
        } catch (error: any) {
            console.error('Error obteniendo coordenadas:', error.message);
            throw error;
        }
    }

    async lugaresCercanosGoogle(
        latitude: any,
        longitude: any,
        radius = 1000,
        type = 'point_of_interest',
    ): Promise<any> {
        try {
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
            const response = await axios.get(url, {
                params: {
                    location: `${latitude},${longitude}`,
                    radius: radius,
                    type: type,
                    key: API_KEY,
                },
            });
            console.log(response);
            const places = response.data.results;
            const lugaresCercanos: ILugaresCercanos[] = [];
            places.forEach((lugaresMaps: any) => {
                const lugar = {
                    nombre: lugaresMaps.name,
                    direccion: lugaresMaps.vicinity,
                    tipo: lugaresMaps.types.join(', '),
                };
                lugaresCercanos.push(lugar);
            });
            return lugaresCercanos;
        } catch (error) {
            console.error('Error al obtener lugares cercanos:', error);
        }
    }
}

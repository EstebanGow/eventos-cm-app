import { IDireccion } from '@application/data';
import { IEventoOut } from '@application/data/out/IEventoOut';
import { ApiClientRest } from '@domain/api';
import { injectable } from 'inversify';

@injectable()
export class ApiClientTest implements ApiClientRest {
    ubicacionesCercanas(_: IEventoOut): Promise<any> {
        const lugaresCercanos = [
            {
                nombre: 'Hotel Faranda Bolívar Cúcuta, a member of Radisson Individuals',
                direccion: 'Avenida Demetrio Mendoza, Puente San Luis',
                tipo: 'lodging, point_of_interest, establishment',
            },
            {
                nombre: 'Hotel Mío Boutique',
                direccion: 'Diagonal 11 E #5A - 35',
                tipo: 'lodging, point_of_interest, establishment',
            },
        ];
        return Promise.resolve(lugaresCercanos);
    }
    obtenerCoordenadas(_: IDireccion): Promise<any> {
        const coordenadas = { latitude: 7.886826, longitude: -72.484806 };
        return Promise.resolve(coordenadas);
    }
}

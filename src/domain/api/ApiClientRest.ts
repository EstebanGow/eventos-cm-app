import { IDireccion } from '@application/data';
import { IEventoOut, ILugaresCercanos } from '@application/data/out/IEventoOut';
import { ICoordenadasModel } from '@domain/model/CoordenadasModel';

export interface ApiClientRest {
    ubicacionesCercanas(evento: IEventoOut): Promise<ILugaresCercanos[]>;
    obtenerCoordenadas(direccion: IDireccion): Promise<ICoordenadasModel>;
}

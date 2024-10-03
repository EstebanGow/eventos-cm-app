import { IDireccion } from '@application/data';
import { IEventoOut } from '@application/data/out/IEventoOut';

export interface ApiClientRest {
    ubicacionesCercanas(evento: IEventoOut): Promise<any>;
    obtenerCoordenadas(direccion: IDireccion): Promise<any>;
}

import { IDireccion, IEvento } from '@application/data';

export interface ApiClientRest {
    ubicacionesCercanas(evento: IEvento): Promise<any>;
    obtenerCoordenadas(direccion: IDireccion): Promise<any>;
}

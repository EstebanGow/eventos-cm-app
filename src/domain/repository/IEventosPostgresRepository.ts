import { IEditarEvento, IEvento, IUsuarioEvento } from '@application/data';
export interface IEventosPostgresRepository {
    guardarEventoTransaccion(example: IEvento): Promise<number>;
    editarEventoTransaccion(example: IEditarEvento): Promise<void>;
    obtenerEventos(idEvento: number | null): Promise<any>;
    inscribirUsuarioEvento(data: IUsuarioEvento): Promise<void>;
    eliminarEventoTransaccion(idEvento: number, idDireccion: number): Promise<void>;
}

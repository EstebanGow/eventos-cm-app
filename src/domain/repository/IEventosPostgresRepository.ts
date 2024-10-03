import { IEditarEvento, IEvento, IUsuarioEvento } from '@application/data';
import { IEventoOut } from '@application/data/out/IEventoOut';
export interface IEventosPostgresRepository {
    guardarEventoTransaccion(example: IEvento): Promise<number>;
    editarEventoTransaccion(example: IEditarEvento): Promise<void>;
    obtenerEventos(idEvento: number | null): Promise<IEventoOut[]>;
    obtenerEvento(idEvento: number | null): Promise<IEventoOut>;
    inscribirUsuarioEvento(data: IUsuarioEvento): Promise<void>;
    eliminarEventoTransaccion(idEvento: number, idDireccion: number): Promise<void>;
}

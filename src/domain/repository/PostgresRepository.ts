import { IEvento, IUsuarioEvento } from '@application/data';
export interface PostgresRepository {
    guardarEventoTransaccion(example: IEvento): Promise<number>;
    editarEventoTransaccion(example: IEvento): Promise<void>;
    inscribirUsuarioEvento(data: IUsuarioEvento): Promise<void>;
    obtenerEventos(idEvento: number | null): Promise<any>;
}

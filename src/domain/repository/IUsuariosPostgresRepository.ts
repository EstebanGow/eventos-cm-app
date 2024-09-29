import { IUsuario } from '@application/data';
export interface IUsuariosPostgresRepository {
    guardarUsuario(data: IUsuario): Promise<number>;
    obtenerUsuario(idUsuario: number | null): Promise<number>;
    eliminarUsuario(idUsuario: number | null): Promise<void>;
}

import { IUsuario } from '@application/data';
import { UsuarioModel } from '@domain/model';
export interface IUsuariosPostgresRepository {
    guardarUsuario(data: IUsuario): Promise<number>;
    obtenerUsuarios(idUsuario: number | null): Promise<UsuarioModel[]>;
    obtenerUsuario(idUsuario: number): Promise<UsuarioModel>;
    eliminarUsuario(idUsuario: number | null): Promise<void>;
}

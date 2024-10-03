import { AutenticacionModel } from '@domain/model';

export interface IAutenticacionIPostgresRepository {
    obtenerUsuarioAutenticacion(usuario: string): Promise<AutenticacionModel>;
}

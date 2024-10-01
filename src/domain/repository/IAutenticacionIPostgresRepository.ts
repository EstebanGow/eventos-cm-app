export interface IAutenticacionIPostgresRepository {
    obtenerUsuarioAutenticacion(usuario: string): Promise<any>;
}

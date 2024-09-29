import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { IDatabase, IMain } from 'pg-promise';
import { ErrorCode, RepositoryException } from '@domain/exceptions';
import { IUsuariosPostgresRepository } from '@domain/repository';
import { IUsuario } from '@application/data';

@injectable()
export class UsuariosPostgresRepository implements IUsuariosPostgresRepository {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.db);

    async guardarUsuario(data: IUsuario): Promise<number> {
        try {
            const query = `
            INSERT INTO
            usuarios(nombres, apellidos, identificacion, telefono, tipo_usuario)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id`;
            const response = await this.db.one(
                query,
                [data.nombres, data.apellidos, data.identificacion, data.telefono, data.tipo_usuario],
                (t) => t.id,
            );
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    async obtenerUsuario(idUsuario: number | null): Promise<any> {
        try {
            const complementoQuery = idUsuario ? `WHERE u.id = ${idUsuario}` : ``;
            const query = `SELECT u.id, u.nombres, u.apellidos, u.identificacion, u.telefono, u.tipo_usuario,
                            json_build_object(
                                'id', tu.id,
                                'descripcion', tu.descripcion
                            ) as tipo_usuario
                        FROM public.usuarios u
                        JOIN tipos_usuario tu on u.tipo_usuario = tu.id
                        ${complementoQuery}`;
            const response = await this.db.manyOrNone(query);
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    async eliminarUsuario(idUsuario: number): Promise<void> {
        try {
            const query = `DELETE FROM usuarios WHERE id = $1`;
            await this.db.none(query, [idUsuario]);
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }
}

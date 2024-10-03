import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { IDatabase, IMain } from 'pg-promise';
import { ErrorCode, RepositoryException } from '@domain/exceptions';
import { IAutenticacionIPostgresRepository } from '@domain/repository';
import { AutenticacionModel } from '@domain/model';

@injectable()
export class AutenticacionPostgresRepository implements IAutenticacionIPostgresRepository {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.db);

    async obtenerUsuarioAutenticacion(usuario: string): Promise<AutenticacionModel> {
        try {
            const query = `SELECT id, usuario, clave
                        FROM public.autenticacion WHERE usuario = $1`;
            const response = await this.db.oneOrNone(query, [usuario]);
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }
}

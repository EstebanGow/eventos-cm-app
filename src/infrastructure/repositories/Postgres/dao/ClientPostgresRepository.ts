import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { IDatabase, IMain } from 'pg-promise';
import { ErrorCode, RepositoryException } from '@domain/exceptions';
import { PostgresRepository } from '@domain/repository';
import { ExampleEntity } from '@domain/entities';

@injectable()
export class ClientPostgresRepository implements PostgresRepository {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.db);
    guardarEvento(example: ExampleEntity): Promise<void> {
        console.log(example);
        throw new Error('Method not implemented.');
    }

    async guardarProcesoExportacion(guias: any, numeroGuias: number, tipo: string): Promise<number> {
        try {
            const query = `
                INSERT INTO
                exportaciones(guias, cantidad_guias, archivo_temporal, archivo_final, tipo)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id`;
            const response = await this.db.one(query, [guias, numeroGuias, false, false, tipo], (t) => t.id);

            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    async actualizarEstadoExportacion(id: number): Promise<object> {
        try {
            const query = `
                UPDATE exportaciones
                SET archivo_temporal = $1
                WHERE id = $2`;
            const response = await this.db.oneOrNone(query, [true, id]);
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }
}

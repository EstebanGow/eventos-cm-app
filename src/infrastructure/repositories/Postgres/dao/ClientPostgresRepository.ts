import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { IDatabase, IMain, ITask } from 'pg-promise';
import { ErrorCode, RepositoryException } from '@domain/exceptions';
import { PostgresRepository } from '@domain/repository';
import { IEditarEvento, IEvento, IUsuarioEvento } from '@application/data';

@injectable()
export class ClientPostgresRepository implements PostgresRepository {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.db);

    async guardarEventoTransaccion(data: IEvento): Promise<number> {
        try {
            return await this.db.tx(async (t) => {
                const idDireccion = await this.guardarDireccion(data, t);
                const idEvento = await this.guardarEvento(data, idDireccion, t);
                return idEvento;
            });
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    async inscribirUsuarioEvento(data: IUsuarioEvento): Promise<void> {
        try {
            await this.guardarUsuario(data);
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    async editarEventoTransaccion(data: IEditarEvento): Promise<void> {
        try {
            await this.db.tx(async (t) => {
                const idDireccion = await this.editarEvento(data, t);
                await this.editarDireccionEvento(data, idDireccion, t);
            });
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    async obtenerEventos(idEvento: number | null): Promise<any> {
        try {
            const complementoQuery = idEvento ? `WHERE e.id = ${idEvento}` : ``;
            const query = `SELECT 
                            e.id,
                            e.nombre,
                            e.fecha_hora,
                            json_build_object(
                                'pais', d.pais,
                                'ciudad', d.ciudad,
                                'direccion', d.direccion
                            ) as direccion,
                            CASE WHEN u.nombres is not null THEN
                            json_agg(json_build_object(
                                'nombres', u.nombres,
                                'apellidos', u.apellidos,
                                'identificacion', u.identificacion,
                                'telefono', u.telefono
                            )) ELSE '[]'
                            END
                            as usuarios
                        FROM eventos e
                        JOIN direcciones d on e.id_direccion = d.id
                        LEFT JOIN usuarios u on u.id_evento = e.id
                        ${complementoQuery}
                        GROUP BY e.id, e.nombre, e.fecha_hora, d.pais, d.ciudad, d.direccion, u.nombres `;
            const response = await this.db.manyOrNone(query);
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    async obtenerEvento(): Promise<any> {
        try {
            const query = `SELECT * FROM eventos`;
            const response = await this.db.manyOrNone(query);
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    private async guardarUsuario(data: IUsuarioEvento): Promise<number> {
        try {
            const query = `
                INSERT INTO
                usuarios(nombres, apellidos, identificacion, telefono, id_evento)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id`;
            const response = await this.db.one(
                query,
                [
                    data.usuario.nombres,
                    data.usuario.apellidos,
                    data.usuario.identificacion,
                    data.usuario.telefono,
                    data.idEvento,
                ],
                (t) => t.id,
            );
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    private async guardarEvento(data: IEvento, idDireccion: number, t: ITask<IMain>): Promise<number> {
        try {
            const query = `
                INSERT INTO
                eventos(nombre, fecha_hora, id_direccion)
                VALUES ($1, $2, $3)
                RETURNING id`;
            const response = await t.one(query, [data.nombre, data.fechaHora, idDireccion], (t) => t.id);
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    private async guardarDireccion(data: IEvento, t: ITask<IMain>): Promise<number> {
        try {
            const query = `
                INSERT INTO
                direcciones(pais, ciudad, direccion)
                VALUES ($1, $2, $3)
                RETURNING id`;
            const response = await t.one(
                query,
                [data.direccion.pais, data.direccion.ciudad, data.direccion.direccion],
                (t) => t.id,
            );
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    private async editarEvento(data: IEditarEvento, t: ITask<IMain>): Promise<number> {
        try {
            const query = `
                UPDATE eventos
                SET nombre = $1, fecha_hora = $2
                WHERE id = $3 RETURNING id_direccion`;
            const response = await t.one(query, [data.nombre, data.fechaHora, data.idEvento], (t) => t.id);
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    private async editarDireccionEvento(data: IEditarEvento, idDireccion: number, t: ITask<IMain>): Promise<void> {
        try {
            const query = `
                UPDATE direcciones
                SET pais = $1, ciudad = $2, direccion = $3
                WHERE id = $4`;
            await t.none(query, [data.direccion.pais, data.direccion.ciudad, data.direccion.direccion, idDireccion]);
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }
}

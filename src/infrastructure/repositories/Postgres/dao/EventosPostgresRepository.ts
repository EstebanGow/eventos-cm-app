import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { IDatabase, IMain, ITask } from 'pg-promise';
import { ErrorCode, RepositoryException } from '@domain/exceptions';
import { IEventosPostgresRepository } from '@domain/repository';
import { IEditarEvento, IEvento, IUsuarioEvento } from '@application/data';

@injectable()
export class EventosPostgresRepository implements IEventosPostgresRepository {
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
                            e.fecha::text,
                            e.hora_inicio,
                            e.hora_fin, 
                            e.descripcion, 
                            e.capacidad, 
                            e.precio, 
                            json_build_object(
                                'id', te.id,
                                'descripcion', te.descripcion
                            ) as tipo_evento,
                            json_build_object(
                                'id', d.id,
                                'pais', d.pais,
                                'ciudad', d.ciudad,
                                'direccion', d.direccion,
                                'longitud', d.longitud,
                                'latitud', d.latitud
                            ) as direccion,
                            CASE WHEN COUNT(u.id) > 0 THEN
                            json_agg(jsonb_build_object(
                                'nombres', u.nombres,
                                'apellidos', u.apellidos,
                                'identificacion', u.identificacion,
                                'telefono', u.telefono
                            )) ELSE '[]'
                            END
                            as usuarios,
                            COUNT(u.id)::int as usuarios_inscritos
                        FROM eventos e
                        JOIN direcciones d on e.id_direccion = d.id
                        JOIN tipos_evento te on e.tipo_evento = te.id
                        LEFT JOIN usuarios_eventos ue on ue.id_evento = e.id
                        LEFT JOIN usuarios u on ue.id_usuario = u.id
                        ${complementoQuery}
                        GROUP BY e.id,
                            e.nombre,
                            e.fecha,
                            e.fecha,
                            e.hora_inicio,
                            e.hora_fin, 
                            e.descripcion, 
                            e.capacidad, 
                            e.precio, 
                            d.pais, 
                            d.id, 
                            d.ciudad, 
                            d.direccion, 
                            d.longitud,
                            d.latitud,
                            te.id, 
                            te.descripcion;`;
            const response = await this.db.manyOrNone(query);
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    private async guardarEvento(data: IEvento, idDireccion: number, t: ITask<IMain>): Promise<number> {
        try {
            const query = `
                INSERT INTO
                eventos(nombre, fecha, hora_inicio, hora_fin, descripcion, capacidad, precio, tipo_evento, id_direccion)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id`;
            const response = await t.one(
                query,
                [
                    data.nombre,
                    data.fecha,
                    data.horaInicio,
                    data.horaFin,
                    data.descripcion,
                    data.capacidad,
                    data.precio,
                    data.tipoEvento,
                    idDireccion,
                ],
                (t) => t.id,
            );
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    async inscribirUsuarioEvento(data: IUsuarioEvento): Promise<void> {
        try {
            const query = `
                INSERT INTO
                usuarios_eventos(id_usuario, id_evento)
                VALUES ($1, $2)`;
            await this.db.none(query, [data.idUsuario, data.idEvento]);
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    private async guardarDireccion(data: IEvento, t: ITask<IMain>): Promise<number> {
        try {
            const query = `
                INSERT INTO
                direcciones(pais, ciudad, direccion, longitud, latitud)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id`;
            const response = await t.one(
                query,
                [
                    data.direccion.pais,
                    data.direccion.ciudad,
                    data.direccion.direccion,
                    data.direccion.longitud,
                    data.direccion.latitud,
                ],
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
                SET nombre = $1, 
                    fecha = $2,
                    hora_inicio = $3, 
                    hora_fin = $4, 
                    descripcion = $5, 
                    capacidad = $6, 
                    precio = $7, 
                    tipo_evento = $8
                WHERE id = $9 RETURNING id_direccion`;
            const response = await t.one(
                query,
                [
                    data.nombre,
                    data.fecha,
                    data.horaInicio,
                    data.horaFin,
                    data.descripcion,
                    data.capacidad,
                    data.precio,
                    data.tipoEvento,
                    data.idEvento,
                ],
                (t) => t.id,
            );
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

    async eliminarEventoTransaccion(idEvento: number, idDireccion: number): Promise<void> {
        try {
            await this.db.tx(async (t) => {
                await this.eliminarEvento(idEvento, t);
                await this.eliminarDireccion(idDireccion, t);
            });
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    private async eliminarEvento(idEvento: number, t: ITask<IMain>): Promise<void> {
        try {
            const query = `DELETE FROM eventos WHERE id = $1`;
            await t.none(query, [idEvento]);
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    private async eliminarDireccion(idDireccion: number, t: ITask<IMain>): Promise<void> {
        try {
            const query = `DELETE FROM direcciones WHERE id = $1`;
            await t.none(query, [idDireccion]);
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }
}

import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { IDatabase, IMain, ITask } from 'pg-promise';
import { ErrorCode, RepositoryException } from '@domain/exceptions';
import moment from 'moment-timezone';
import { IPlantillasPostgresRepository } from '@domain/repository';
import { ErrorArchivoEntity } from '@domain/entities';
@injectable()
export class PlantillasPostgresRepository implements IPlantillasPostgresRepository {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.db);

    async guardarCargaArchivo(nombreArchivo: string, totalRegistros: number): Promise<void> {
        try {
            const fechaActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
            const query = `INSERT INTO public.importacion_eventos
                    (nombre_archivo, fecha_hora_registro, total_registros, estado, registros_fallidos, registros_exitosos)
                    VALUES($1, $2, $3, 1, 0, 0);`;
            await this.db.none(query, [nombreArchivo, fechaActual, totalRegistros]);
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    async guardarRegistroImportacionEventoTransaccion(data: ErrorArchivoEntity): Promise<void> {
        try {
            return await this.db.tx(async (t) => {
                await this.guardarRegistroImportacionEvento(data, t);
                await this.actulizarRegistroArchivoFallido(data.idArchivo, t);
            });
        } catch ({ message, statusCode, code, cause }: any) {
            console.error(message);
            console.error(cause);
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }
    async actulizarRegistroArchivoExitoso(idArchivo: number): Promise<void> {
        const query = `UPDATE public.importacion_eventos SET  registros_exitosos = registros_exitosos + 1 WHERE id=$1;`;
        await this.db.none(query, [idArchivo]);
    }
    async actulizarEstadoArchivo(idArchivo: number, estado: number): Promise<void> {
        const query = `UPDATE public.importacion_eventos SET estado = $1 WHERE id = $2;`;
        await this.db.none(query, [estado, idArchivo]);
    }

    async actulizarRegistroArchivoFallido(idArchivo: number, t: ITask<IMain>): Promise<void> {
        const query = `UPDATE public.importacion_eventos SET registros_fallidos = registros_fallidos + 1 WHERE id=$1;`;
        await t.none(query, [idArchivo]);
    }

    async guardarRegistroImportacionEvento(data: ErrorArchivoEntity, t: ITask<IMain>): Promise<void> {
        try {
            const fechaActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
            const query = `INSERT INTO public.registros_importacion_eventos
                    (id_archivo_importaciones, contenido, fecha_hora_estado, descripcion_error)
                    VALUES($1, $2, $3, $4);`;
            await t.none(query, [data.idArchivo, data.contenido, fechaActual, data.descripcionError]);
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }

    async obtenerEstadoCargaEventos(idArchivo: number): Promise<any> {
        try {
            const query = `SELECT ie.id, 
                                ie.nombre_archivo,  
                                ei.nombre as estado,
                                ie.total_registros, 
                                ie.registros_fallidos,
                                ie.registros_exitosos, 
                                CASE WHEN COUNT(rie.id) > 0 THEN
                                    json_agg(jsonb_build_object(
                                        'contenido', rie.contenido::json,
                                        'error', rie.descripcion_error 
                                    )) ELSE '[]'
                                    END as descripcion_fallidos
                                FROM importacion_eventos ie 
                                JOIN estados_importacion ei ON ie.estado = ei.codigo
                                LEFT JOIN registros_importacion_eventos rie ON rie.id_archivo_importaciones = ie.id
                                WHERE ie.id = $1
                                GROUP BY ie.id,
                                ie.nombre_archivo,  
                                ei.nombre,
                                ie.total_registros, 
                                ie.registros_fallidos,
                                ie.registros_exitosos`;
            const response = await this.db.oneOrNone(query, [idArchivo]);
            return response;
        } catch ({ message, statusCode, code, cause }: any) {
            throw new RepositoryException(message as string, statusCode as number, code as ErrorCode, cause as string);
        }
    }
}

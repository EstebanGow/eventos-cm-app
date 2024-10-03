import { ErrorArchivoEntity } from '@domain/entities';

export interface IPlantillasPostgresRepository {
    guardarCargaArchivo(nombreArvhivo: string, totalRegistros: number): Promise<void>;
    actulizarRegistroArchivoExitoso(idArchivo: number): Promise<void>;
    guardarRegistroImportacionEventoTransaccion(data: ErrorArchivoEntity): Promise<void>;
    actulizarEstadoArchivo(idArchivo: number, estado: number): Promise<void>;
    obtenerEstadoCargaEventos(idArchivo: number): Promise<any>;
}

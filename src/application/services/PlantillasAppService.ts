import { injectable } from 'inversify';
import { Result, Response } from '@domain/response';
import { EstadoProcesoModel } from '@domain/model';
import { EstadoProcesoArchivo, IArchivo } from '@domain/enum';
import { ICargaMasiva, IEventoImportacion } from '@application/data';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { IPlantillasPostgresRepository } from '@domain/repository';
import { EventosAppService } from './EventosAppService';
import { ErrorArchivoEntity } from '@domain/entities';
import {
    eliminarPlantilla,
    formatearArchivo,
    guardarExcelDesdeBase64,
    leerArchivoExcel,
    obtnerPlantilla,
    validarColumnasPlantillaService,
} from '@domain/services';

@injectable()
export class PlantillasAppService {
    readonly ENCABEZADOS = [
        'nombre',
        'fecha',
        'horaInicio',
        'horaFin',
        'direccion (pais:ciudad:direccion)',
        'descripcion',
        'precio',
        'capacidad',
        'tipoEvento',
    ];

    private postgresqlRepository = DEPENDENCY_CONTAINER.get<IPlantillasPostgresRepository>(
        TYPES.PlantillasPostgresRepository,
    );
    private eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);

    async obtenerPlantillaService(): Promise<Response<string | null>> {
        const base64 = obtnerPlantilla(IArchivo.XLSX);
        return Result.ok(base64);
    }

    async procesarArchivoService(data: IEventoImportacion): Promise<Response<string | null>> {
        const archivo = obtnerPlantilla(data.data.nombre_archivo);
        const plantilla = leerArchivoExcel(archivo);
        validarColumnasPlantillaService(plantilla.encabezados);
        const eventosFormateados = formatearArchivo(plantilla.eventosImportados);
        await this.postgresqlRepository.actulizarEstadoArchivo(data.data.id, EstadoProcesoArchivo.PROCESANDO);
        await this.procesarArchivo(eventosFormateados, data);
        await this.postgresqlRepository.actulizarEstadoArchivo(data.data.id, EstadoProcesoArchivo.FINALIZADO);
        eliminarPlantilla(data.data.nombre_archivo);
        return Result.ok('Archivo procesado exitosamente.');
    }

    async cargarArchivoService(data: ICargaMasiva): Promise<Response<any | null>> {
        const plantilla = leerArchivoExcel(data.archivo);
        validarColumnasPlantillaService(plantilla.encabezados);
        guardarExcelDesdeBase64(data);
        const eventosFormateados = formatearArchivo(plantilla.eventosImportados);
        const totalRegistros = eventosFormateados.length;
        await this.postgresqlRepository.guardarCargaArchivo(data.nombre, totalRegistros);
        return Result.ok('Ejecucion de archivo programada exitosamente.');
    }

    async obtenerEstadoCargaEventosService(idArchivo: number): Promise<Response<EstadoProcesoModel | null>> {
        const response = await this.postgresqlRepository.obtenerEstadoCargaEventos(idArchivo);
        return Result.ok(response);
    }

    async guardarErrorImportacion(data: ErrorArchivoEntity): Promise<void | null> {
        await this.postgresqlRepository.guardarRegistroImportacionEventoTransaccion(data);
    }

    private async procesarArchivo(eventos: any[], data: IEventoImportacion): Promise<void> {
        for (const evento of eventos) {
            const response = await this.eventosAppService.guardarEventoImportacionService(evento);
            if (response.error) {
                const errorArchivoEntity = new ErrorArchivoEntity(data, evento, response);
                await this.guardarErrorImportacion(errorArchivoEntity);
            } else {
                this.postgresqlRepository.actulizarRegistroArchivoExitoso(data.data.id);
            }
        }
    }
}

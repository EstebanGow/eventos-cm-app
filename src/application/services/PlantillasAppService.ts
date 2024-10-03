import { injectable } from 'inversify';
import { Result, Response } from '@domain/response';
import * as XLSX from 'xlsx';
import { FilaEventoModel } from '@domain/model';
import { EstadoProcesoArchivo, IArchivo } from '@domain/enum';
import { ICargaMasiva, IEventoImportacion } from '@application/data';
import * as fs from 'fs';
import path from 'path';
import { CamposDireccion } from '@domain/enum';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { IPlantillasPostgresRepository } from '@domain/repository';
import { EventosAppService } from './EventosAppService';
import moment from 'moment';
import { ErrorArchivoEntity } from '@domain/entities';
import { SERVICE_NAME } from '@util';

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
        const base64 = this.obtnerPlantilla(IArchivo.XLSX);
        console.log(base64);
        return Result.ok(base64);
    }

    async procesarArchivoService(data: IEventoImportacion): Promise<Response<any | null>> {
        try {
            const archivo = this.obtnerPlantilla(data.data.nombre_archivo);
            const workbook = XLSX.read(archivo, { type: 'base64' });
            const eventosImportados: FilaEventoModel[] = XLSX.utils.sheet_to_json(
                workbook.Sheets[workbook.SheetNames[0]],
            );
            const eventosFormateados = this.formatearArchivo(eventosImportados);
            await this.postgresqlRepository.actulizarEstadoArchivo(data.data.id, EstadoProcesoArchivo.PROCESANDO);
            await this.procesarArchivo(eventosFormateados, data);
            await this.postgresqlRepository.actulizarEstadoArchivo(data.data.id, EstadoProcesoArchivo.FINALIZADO);
            return Result.ok('Archivo procesado exitosamente.');
        } catch (error: any) {
            await this.postgresqlRepository.actulizarEstadoArchivo(data.data.id, EstadoProcesoArchivo.FALLIDO);
            throw new Error('Error porcesando el archivo', error);
        }
    }

    async cargarArchivoService(data: ICargaMasiva): Promise<Response<any | null>> {
        try {
            this.guardarExcelDesdeBase64(data);
            const workbook = XLSX.read(data.archivo, { type: 'base64' });
            const eventosImportados: FilaEventoModel[] = XLSX.utils.sheet_to_json(
                workbook.Sheets[workbook.SheetNames[0]],
            );
            const eventosFormateados = this.formatearArchivo(eventosImportados);
            const totalRegistros = eventosFormateados.length;
            await this.postgresqlRepository.guardarCargaArchivo(data.nombre, totalRegistros);
            return Result.ok('Ejecucion de archivo programada exitosamente.');
        } catch (error: any) {
            throw new Error('Error cargando el archivo', error);
        }
    }

    async obtenerEstadoCargaEventosService(idArchivo: number): Promise<Response<any | null>> {
        try {
            const response = await this.postgresqlRepository.obtenerEstadoCargaEventos(idArchivo);
            return Result.ok(response);
        } catch (error: any) {
            throw new Error('Error consultando estado proceso', error);
        }
    }

    async guardarErrorImportacion(data: ErrorArchivoEntity): Promise<Response<any | null>> {
        try {
            await this.postgresqlRepository.guardarRegistroImportacionEventoTransaccion(data);
            return Result.ok();
        } catch (error: any) {
            throw new Error('Error marcando registro archivo importacion', error);
        }
    }

    validarColumnasPlantillaService(encabezados: string[], columnasEspradas: string[]) {
        const missingColumns = columnasEspradas.filter((col) => !encabezados.includes(col));
        const extraColumns = encabezados.filter((col) => !columnasEspradas.includes(col));

        if (missingColumns.length === 0 && extraColumns.length === 0) {
            console.log('Todas las columnas son válidas.');
            return true;
        }
        if (missingColumns.length > 0) {
            console.log('Columnas faltantes:', missingColumns);
        }
        if (extraColumns.length > 0) {
            console.log('Columnas extra:', extraColumns);
        }
        return false;
    }

    private obtnerPlantilla(fileName: string): string {
        try {
            const file = fs.readFileSync(`/${SERVICE_NAME}/archivos/${fileName}`);
            return file.toString('base64');
        } catch (error) {
            throw new Error('Error generando el archivo');
        }
    }

    private formatearArchivo(data: any[]) {
        for (const evento of data) {
            evento.fecha = moment(evento.fecha).format('YYYY-MM-DD');
            const camposDireccion: any[] = evento['direccion (pais:ciudad:direccion)'].split(':');
            evento.direccion = {
                pais: camposDireccion[CamposDireccion.PAIS].replace('(', ''),
                ciudad: camposDireccion[CamposDireccion.CIUDAD],
                direccion: camposDireccion[CamposDireccion.DIRECCION].replace(')', ''),
            };
            delete evento['direccion (pais:ciudad:direccion)'];
        }
        return data;
    }

    private guardarExcelDesdeBase64(data: ICargaMasiva) {
        try {
            const buffer = Buffer.from(data.archivo, 'base64');
            const rutaCompleta = path.join(`/${SERVICE_NAME}/archivos/`, data.nombre);
            fs.writeFile(rutaCompleta, buffer, (err) => {
                if (err) {
                    console.error('Error al guardar el archivo:', err);
                } else {
                    return `Archivo guardado exitosamente en: ${rutaCompleta}`;
                }
            });
        } catch (error) {
            throw new Error(`Error al guardar el archivo: ${error}`);
        }
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

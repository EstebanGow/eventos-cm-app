import { injectable } from 'inversify';
import { Result, Response } from '@domain/response';
import { formatearArchivo, obtnerPlantilla } from '@domain/services/PlantillasDomainService';
import * as XLSX from 'xlsx';
import { FilaEventoModel } from '@domain/model';
import { IArchivoEnum } from '@domain/enum';
import { ICargaMasiva } from '@application/data';

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
    async obtenerPlantillaService(): Promise<Response<string | null>> {
        const base64 = obtnerPlantilla(IArchivoEnum.xlsx);
        console.log(base64);
        return Result.ok(base64);
    }
    async procesarArchivoService(data: ICargaMasiva): Promise<Response<any | null>> {
        try {
            const workbook = XLSX.read(data.archivo, { type: 'base64' });
            const eventosImportados: FilaEventoModel[] = XLSX.utils.sheet_to_json(
                workbook.Sheets[workbook.SheetNames[0]],
            );
            console.log(eventosImportados);
            const eventosFormateados = formatearArchivo(eventosImportados);
            console.log(eventosFormateados);
            return Result.ok('Archivo procesado exitosamente.');
        } catch (error: any) {
            throw new Error('Error porcesando el archivo', error);
        }
    }
}

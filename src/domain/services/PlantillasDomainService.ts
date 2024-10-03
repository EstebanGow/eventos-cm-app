import { ICargaMasiva } from '@application/data';
import { SERVICE_NAME } from '@util';
import moment from 'moment';
import * as fs from 'fs';
import path from 'path';
import { CamposDireccion } from '@domain/enum';
import * as XLSX from 'xlsx';
import { FilaEventoModel } from '@domain/model';

export const obtnerPlantilla = (fileName: string) => {
    try {
        const file = fs.readFileSync(`/${SERVICE_NAME}/archivos/${fileName}`);
        return file.toString('base64');
    } catch (error) {
        throw new Error('Error generando el archivo');
    }
};

export const formatearArchivo = (data: any[]) => {
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
};

export const guardarExcelDesdeBase64 = (data: ICargaMasiva) => {
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
};

export const eliminarPlantilla = (nombreArchivo: string) => {
    fs.unlink(`/${SERVICE_NAME}/archivos/${nombreArchivo}`, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
};

export const leerArchivoExcel = (archivoBase64: string) => {
    const workbook = XLSX.read(archivoBase64, { type: 'base64' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const encabezados: any = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];
    const eventosImportados: FilaEventoModel[] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    return { eventosImportados, encabezados };
};

export const validarColumnasPlantillaService = (encabezados: string[]) => {
    const columnasFaltantes = ENCABEZADOS.filter((header: string) => !encabezados.includes(header));
    if (columnasFaltantes.length > 0) {
        throw new Error(`Columnas faltantes en el archivo Excel: ${columnasFaltantes.join(', ')}`);
    }
};

const ENCABEZADOS = [
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

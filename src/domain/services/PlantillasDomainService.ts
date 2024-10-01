import { CamposDireccion } from '@domain/enum';
import * as fs from 'fs';

export const obtnerPlantilla = (fileName: string): string => {
    try {
        const file = fs.readFileSync(`/eventos-cm-app/archivos/${fileName}`);
        return file.toString('base64');
    } catch (error) {
        throw new Error('Error generando el archivo');
    }
};

export const formatearArchivo = (data: any[]) => {
    for (const evento of data) {
        const camposDireccion: any[] = evento['direccion (pais:ciudad:direccion)'].split(':');
        evento.direccion = {
            pais: camposDireccion[CamposDireccion.PAIS].replace('(', ''),
            ciudad: camposDireccion[CamposDireccion.CIUDAD],
            direccion: camposDireccion[CamposDireccion.DIRECCION].replace(')', ''),
        };
    }
    return data;
};

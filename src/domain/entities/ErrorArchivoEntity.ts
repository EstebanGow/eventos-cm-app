import { IEvento, IEventoImportacion } from '@application/data';
import { IRespuestaEvento } from '@application/data/out/IRespuestaEvento';

export class ErrorArchivoEntity {
    readonly idArchivo: number;
    readonly contenido: string;
    readonly descripcionError: string;

    constructor(data: IEventoImportacion, evento: IEvento, respuestaEvento: IRespuestaEvento) {
        this.idArchivo = data.data.id;
        this.contenido = JSON.stringify(evento);
        this.descripcionError = respuestaEvento.mensaje ? respuestaEvento.mensaje : '';
    }

    static create(data: IEventoImportacion, evento: IEvento, respuestaEvento: IRespuestaEvento): ErrorArchivoEntity {
        return new ErrorArchivoEntity(data, evento, respuestaEvento);
    }
}

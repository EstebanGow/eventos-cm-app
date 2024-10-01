import { injectable } from 'inversify';
import { Result, Response } from '@domain/response';
import { IArchivo } from '@application/data/in/IArchivo';
import * as fs from 'fs';

@injectable()
export class PlantillasAppService {
    async obtenerPlantillaService(): Promise<Response<string | null>> {
        const base64 = this.getFile(IArchivo.xlsx);
        console.log(base64);
        return Result.ok(base64);
    }

    private getFile(fileName: string): string {
        try {
            const file = fs.readFileSync(`/eventos-cm-app/archivos/${fileName}`);
            return file.toString('base64');
        } catch (error) {
            throw new Error('Error generando el archivo');
        }
    }
}

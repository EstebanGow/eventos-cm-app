import { IEvento, IEditarEvento, IUsuarioEvento } from '@application/data';
import { IEventoOut } from '@application/data/out/IEventoOut';
import { IEventosPostgresRepository } from '@domain/repository';
import { injectable } from 'inversify';
import { respuestaEventoRepositoryMock } from '../data/respuestas';

@injectable()
export class EventosRepositoryMock implements IEventosPostgresRepository {
    guardarEventoTransaccion(_example: IEvento): Promise<number> {
        return Promise.resolve(2);
    }
    editarEventoTransaccion(_example: IEditarEvento): Promise<void> {
        return Promise.resolve();
    }

    obtenerEventos(_idEvento: number | null): Promise<IEventoOut[]> {
        return Promise.resolve([respuestaEventoRepositoryMock]);
    }
    obtenerEvento(_idEvento: number | null): Promise<IEventoOut> {
        return Promise.resolve(respuestaEventoRepositoryMock);
    }
    inscribirUsuarioEvento(_data: IUsuarioEvento): Promise<void> {
        return Promise.resolve();
    }
    eliminarEventoTransaccion(_idEvento: number, _idDireccion: number): Promise<void> {
        return Promise.resolve();
    }
}

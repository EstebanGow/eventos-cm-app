import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { PostgresRepository } from '@domain/repository';
import { IEditarEvento, IEvento, IUsuarioEvento } from '@application/data';
import { IEventoOut } from '@application/data/out/IEventoOut';

@injectable()
export class EventosAppService {
    private postgresqlRepository = DEPENDENCY_CONTAINER.get<PostgresRepository>(TYPES.PostgresRepository);

    async obtenerEventoService(idEvento: number): Promise<Response<string | null>> {
        const response = await this.postgresqlRepository.obtenerEventos(idEvento);
        return Result.ok(response);
    }

    async obtenerEventosService(): Promise<Response<any | null>> {
        const response = await this.postgresqlRepository.obtenerEventos(null);
        return Result.ok(response);
    }

    async guardarEventoService(data: IEvento): Promise<Response<IEventoOut | null>> {
        const response = await this.postgresqlRepository.guardarEventoTransaccion(data);
        return Result.ok({ idEvento: response });
    }

    async inscribirUsuarioEventoService(data: IUsuarioEvento): Promise<Response<string | null>> {
        await this.postgresqlRepository.inscribirUsuarioEvento(data);
        return Result.ok();
    }

    async editarEventoService(data: IEditarEvento): Promise<Response<string | null>> {
        await this.postgresqlRepository.editarEventoTransaccion(data);
        return Result.ok();
    }
}

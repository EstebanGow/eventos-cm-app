import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { ExampleEntity } from '@domain/entities';
import { calculateNameLength } from '@domain/services';
import { Result, Response } from '@domain/response';
import { PostgresRepository } from '@domain/repository';

@injectable()
export class EventosAppService {
    private postgresqlRepository = DEPENDENCY_CONTAINER.get<PostgresRepository>(TYPES.PostgresRepository);
    async obtenerEventoService(): Promise<Response<string | null>> {
        const response = await this.postgresqlRepository.obtenerEventos();
        return Result.ok(response);
    }

    async obtenerEventosService(): Promise<Response<string | null>> {
        const example = ExampleEntity.create('123', 'Daniel');
        await this.postgresqlRepository.guardarEvento(example);
        const length = calculateNameLength(example.name);
        const result = length <= 4 ? `You're weird` : `You're incredible`;
        return Result.ok(result);
    }

    async guardarEventoService(): Promise<Response<string | null>> {
        const example = ExampleEntity.create('123', 'Daniel');
        await this.postgresqlRepository.guardarEvento(example);
        const length = calculateNameLength(example.name);
        const result = length <= 4 ? `You're weird` : `You're incredible`;
        return Result.ok(result);
    }

    async editarEventoService(): Promise<Response<string | null>> {
        const example = ExampleEntity.create('123', 'Daniel');
        await this.postgresqlRepository.guardarEvento(example);
        const length = calculateNameLength(example.name);
        const result = length <= 4 ? `You're weird` : `You're incredible`;
        return Result.ok(result);
    }
}

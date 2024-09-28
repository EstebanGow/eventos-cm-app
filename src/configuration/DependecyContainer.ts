import { Container } from 'inversify';
import { EventosAppService } from '@application/services';
import { TYPES } from '@configuration';
import { PostgresRepository, RedisRepository } from '@domain/repository';
import { ClientPostgresRepository, db } from '@infrastructure/repositories/Postgres';
import { RedisGuiaRepository } from '@infrastructure/repositories/redis';
import { IDatabase, IMain } from 'pg-promise';

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind(EventosAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind<PostgresRepository>(TYPES.PostgresRepository)
        .to(ClientPostgresRepository)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<RedisRepository>(TYPES.RedisGuiaRepository).to(RedisGuiaRepository).inSingletonScope();
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.db).toConstantValue(db);
};

import { Container } from 'inversify';
import { EventosAppService, UsuariosAppService } from '@application/services';
import { TYPES } from '@configuration';
import { IEventosPostgresRepository, IUsuariosPostgresRepository, RedisRepository } from '@domain/repository';
import { EventosPostgresRepository, UsuariosPostgresRepository, db } from '@infrastructure/repositories/Postgres';
import { RedisGuiaRepository } from '@infrastructure/repositories/redis';
import { IDatabase, IMain } from 'pg-promise';

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind(EventosAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(UsuariosAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind<IEventosPostgresRepository>(TYPES.EventosPostgresRepository)
        .to(EventosPostgresRepository)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<IUsuariosPostgresRepository>(TYPES.UsuariosPostgresRepository)
        .to(UsuariosPostgresRepository)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<RedisRepository>(TYPES.RedisGuiaRepository).to(RedisGuiaRepository).inSingletonScope();
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.db).toConstantValue(db);
};

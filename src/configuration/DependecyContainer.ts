import { Container } from 'inversify';
import { EventosAppService, PlantillasAppService, UsuariosAppService } from '@application/services';
import { TYPES } from '@configuration';
import {
    IAutenticacionIPostgresRepository,
    IEventosPostgresRepository,
    IPlantillasPostgresRepository,
    IUsuariosPostgresRepository,
    RedisRepository,
} from '@domain/repository';
import {
    AutenticacionPostgresRepository,
    EventosPostgresRepository,
    PlantillasPostgresRepository,
    UsuariosPostgresRepository,
    db,
} from '@infrastructure/repositories/Postgres';
import { redisClient, RedisEventosRepository } from '@infrastructure/repositories/redis';
import { IDatabase, IMain } from 'pg-promise';
import { ApiClient } from '@infrastructure/api-client';
import { AutenticacionAppService } from '@application/services/AutenticacionAppService';
import { ApiClientRest } from '@domain/api';

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind(EventosAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(UsuariosAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(PlantillasAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(AutenticacionAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind<ApiClientRest>(TYPES.ApiClient).to(ApiClient).inSingletonScope();
    DEPENDENCY_CONTAINER.bind(TYPES.RedisClient).toConstantValue(redisClient);
    DEPENDENCY_CONTAINER.bind<IEventosPostgresRepository>(TYPES.EventosPostgresRepository)
        .to(EventosPostgresRepository)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<IPlantillasPostgresRepository>(TYPES.PlantillasPostgresRepository)
        .to(PlantillasPostgresRepository)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<IUsuariosPostgresRepository>(TYPES.UsuariosPostgresRepository)
        .to(UsuariosPostgresRepository)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<IAutenticacionIPostgresRepository>(TYPES.AutenticacionPostgresRepository)
        .to(AutenticacionPostgresRepository)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<RedisRepository>(TYPES.RedisEventosRepository)
        .to(RedisEventosRepository)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.db).toConstantValue(db);
};

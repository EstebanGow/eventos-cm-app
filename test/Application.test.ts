import { application } from '@infrastructure/api/Application';
import { TYPES, DEPENDENCY_CONTAINER, createDependencyContainer } from '@configuration';
import { eventosDatabase } from './data';
import { dbConect } from './data/dbConect';
import { IDatabase, IMain } from 'pg-promise';
import { responseValidarTokenMOck, respuestaServiceMock } from './data/respuestas';
import { ApiClientTest } from './__moks__/ApiClientTest';
import { ApiClientRest } from '@domain/api';
import { AutenticacionAppService } from './__moks__/AutenticationServiceMock';
import { validarToken } from '@domain/services';
import { EventosRepositoryMock } from './__moks__/EventosRepositoryMock';
import { IEventosPostgresRepository } from '@domain/repository';

jest.mock('@domain/services/AutenticacionDomainService');

describe('EventosAppService', () => {
    beforeAll(() => {
        if (DEPENDENCY_CONTAINER) {
            DEPENDENCY_CONTAINER.unbindAll();
        }
        createDependencyContainer();
        const db = dbConect(eventosDatabase());
        DEPENDENCY_CONTAINER.rebind<IDatabase<IMain>>(TYPES.db).toConstantValue(db);
        DEPENDENCY_CONTAINER.rebind<ApiClientRest>(TYPES.ApiClient).to(ApiClientTest).inSingletonScope();
        DEPENDENCY_CONTAINER.rebind<IEventosPostgresRepository>(TYPES.EventosPostgresRepository)
            .to(EventosRepositoryMock)
            .inSingletonScope();
        DEPENDENCY_CONTAINER.get.bind(AutenticacionAppService);
    });

    it('Consultar evento', async () => {
        (validarToken as jest.Mock).mockReturnValue(responseValidarTokenMOck);
        const response = await application.inject({
            method: 'GET',
            headers: { authorization: 'Bearer token' },
            url: `/eventos-cm-app/evento/2`,
        });
        const respuestaService = JSON.parse(response.body);
        expect(response.statusCode).toBe(200);
        expect(respuestaService).toEqual(respuestaServiceMock);
    });
});

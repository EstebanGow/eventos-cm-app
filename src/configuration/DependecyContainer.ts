import { Container } from 'inversify';
import { Firestore } from '@google-cloud/firestore';
import { ExampleAppService } from '@application/services';
import { firestore, FirestoreExampleRepository } from '@infrastructure/repositories';
import { ExampleRepository } from '@domain/repository';
import { TYPES } from '@configuration';
import { ExampleApiClient } from '@infrastructure/api-client';

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind<Firestore>(TYPES.Firestore).toConstantValue(firestore);
    DEPENDENCY_CONTAINER.bind(ExampleAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(ExampleApiClient).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind<ExampleRepository>(TYPES.FirestoreExampleRepository)
        .to(FirestoreExampleRepository)
        .inSingletonScope();
};

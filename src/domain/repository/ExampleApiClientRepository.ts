import { IResponseApiClient } from '@domain/response';

export interface ExampleApiClientRepository {
    get(id: string): Promise<IResponseApiClient<string>>;
}

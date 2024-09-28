import got from 'got';
import { injectable } from 'inversify';
import { ApiClientException } from '@domain/exceptions';
import { API_EXAMPLE } from '@util';
import { ExampleApiClientRepository } from '@domain/repository';
import { IResponseApiClient } from '@domain/response';

@injectable()
export class ExampleApiClient implements ExampleApiClientRepository {
    async get(id: string): Promise<IResponseApiClient<string>> {
        try {
            return await got.get<IResponseApiClient<string>>({
                url: `${API_EXAMPLE}/params/${id}`,
                responseType: 'json',
                resolveBodyOnly: true,
            });
        } catch (err) {
            console.error(err);
            throw new ApiClientException(
                `Error al consultar la fecha de recaudo al api client: \n ${JSON.stringify(err)}`,
            );
        }
    }
}

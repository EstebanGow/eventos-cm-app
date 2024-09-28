import { ExampleEntity } from '@domain/entities';
export interface PostgresRepository {
    guardarEvento(example: ExampleEntity): Promise<void>;
}

import { ExampleEntity } from '@domain/entities';

export interface ExampleRepository {
    save(example: ExampleEntity): Promise<void>;
}

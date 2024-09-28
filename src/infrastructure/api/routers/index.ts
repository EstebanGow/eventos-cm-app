import { example } from './ExampleRouter';
import { FastifyInstance } from 'fastify';
import { examplePostSchema, exampleGetSchema } from '@infrastructure/api/swagger';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.get(`/:terminal`, exampleGetSchema, example);
    application.post(`/`, examplePostSchema, example);
};

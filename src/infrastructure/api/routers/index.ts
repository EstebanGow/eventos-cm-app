import { editarEventoRouter, guardarEventoRouter, obtenerEventoRouter, obtenerEventosRouter } from './EventosRouter';
import { FastifyInstance } from 'fastify';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.get('/', obtenerEventoRouter);
    application.get('/evento', obtenerEventoRouter);
    application.get('/eventos', obtenerEventosRouter);
    application.post('/evento', guardarEventoRouter);
    application.put('/evento', editarEventoRouter);
};

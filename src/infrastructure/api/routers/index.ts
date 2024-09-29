import {
    editarEventoRouter,
    guardarEventoRouter,
    inscribirUsuarioEventoRouter,
    obtenerEventoRouter,
    obtenerEventosRouter,
} from './EventosRouter';
import { FastifyInstance } from 'fastify';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.get('/evento/:id', obtenerEventoRouter);
    application.get('/eventos', obtenerEventosRouter);
    application.post('/evento', guardarEventoRouter);
    application.post('/evento/inscribir-usuario', inscribirUsuarioEventoRouter);
    application.put('/evento', editarEventoRouter);
};

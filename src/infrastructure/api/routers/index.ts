import {
    editarEventoRouter,
    eliminarEventoRouter,
    guardarEventoRouter,
    inscribirUsuarioEventoRouter,
    obtenerEventoRouter,
    obtenerEventosRouter,
    obtenerMetricasRouter,
} from './EventosRouter';
import { FastifyInstance } from 'fastify';
import {
    crearUsuarioRouter,
    eliminarUsuarioRouter,
    obtenerUsuarioRouter,
    obtenerUsuariosRouter,
} from './UsuariosRouter';
import { obtenerPlantillaRouter } from './PlantillasRouter';
import {
    eventoGetSchema,
    eventosGetSchema,
    eventosPostSchema,
    eventosPutSchema,
    metricasEventosGetSchema,
    usuarioEventoPostSchema,
} from '../swagger';
import { eventoDeleteSchema } from '../swagger/schemas/eventoDeleteSchema';
import { autenticarUsuarioRouter, verificarTokenRouter } from './AutenticacionRouter';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.get('/evento/:id', eventoGetSchema, obtenerEventoRouter);
    application.get('/eventos', eventosGetSchema, obtenerEventosRouter);
    application.post('/evento', eventosPostSchema, guardarEventoRouter);
    application.post('/evento/inscribir-usuario', usuarioEventoPostSchema, inscribirUsuarioEventoRouter);
    application.put('/evento', eventosPutSchema, editarEventoRouter);
    application.delete('/evento/eliminar/:id', eventoDeleteSchema, eliminarEventoRouter);
    application.get('/eventos/metricas', metricasEventosGetSchema, obtenerMetricasRouter);

    application.post('/usuarios/usuario', crearUsuarioRouter);
    application.get('/usuarios/usuario/:id', obtenerUsuarioRouter);
    application.get('/usuarios/usuarios', obtenerUsuariosRouter);
    application.delete('/usuarios/eliminar/:id', eliminarUsuarioRouter);

    application.get('/plantilla', obtenerPlantillaRouter);
    application.post('/autenticar', autenticarUsuarioRouter);

    application.addHook('onRequest', async (request, reply) => {
        if (request.routerPath !== '/eventos-cm-app/autenticar') {
            await verificarTokenRouter(request, reply);
        }
    });
};

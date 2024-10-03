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
import {
    cargarArchivoRouter,
    obtenerEstadoCargaEventosRouter,
    obtenerPlantillaRouter,
    procesarArchivoRouter,
} from './PlantillasRouter';
import {
    eventoGetSchema,
    eventosGetSchema,
    eventosPostSchema,
    eventosPutSchema,
    metricasEventosGetSchema,
    plantillaCargarPostSchema,
    plantillaGetSchema,
    plantillaProcesoGetSchema,
    usuarioDeleteSchema,
    usuarioEventoPostSchema,
    usuarioGetSchema,
    usuariosGetSchema,
    usuariosPostSchema,
} from '../swagger';
import { eventoDeleteSchema } from '../swagger/schemas/eventoDeleteSchema';
import { autenticarUsuarioRouter, verificarTokenRouter } from './AutenticacionRouter';
import { subscriber } from '@infrastructure/repositories';
import { IEventoImportacion } from '@application/data';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.get('/evento/:id', eventoGetSchema, obtenerEventoRouter);
    application.get('/eventos', eventosGetSchema, obtenerEventosRouter);
    application.post('/evento', eventosPostSchema, guardarEventoRouter);
    application.post('/evento/inscribir-usuario', usuarioEventoPostSchema, inscribirUsuarioEventoRouter);
    application.put('/evento', eventosPutSchema, editarEventoRouter);
    application.delete('/evento/eliminar/:id', eventoDeleteSchema, eliminarEventoRouter);
    application.get('/eventos/metricas', metricasEventosGetSchema, obtenerMetricasRouter);

    application.post('/usuarios/usuario', usuariosPostSchema, crearUsuarioRouter);
    application.get('/usuarios/usuario/:id', usuarioGetSchema, obtenerUsuarioRouter);
    application.get('/usuarios/usuarios', usuariosGetSchema, obtenerUsuariosRouter);
    application.delete('/usuarios/eliminar/:id', usuarioDeleteSchema, eliminarUsuarioRouter);

    application.get('/plantilla', plantillaGetSchema, obtenerPlantillaRouter);
    application.get(
        '/plantilla/obtener-estado-proceso/:id',
        plantillaProcesoGetSchema,
        obtenerEstadoCargaEventosRouter,
    );
    application.post('/plantilla/carga', plantillaCargarPostSchema, cargarArchivoRouter);

    application.post('/autenticar', autenticarUsuarioRouter);
    application.addHook('onRequest', async (request, reply) => {
        if (
            request.routerPath !== '/eventos-cm-app/autenticar' &&
            request.routerPath !== '/eventos-cm-app/plantilla/carga'
        ) {
            await verificarTokenRouter(request, reply);
        }
    });
};

subscriber.notifications.on('events', async (data: IEventoImportacion) => {
    await procesarArchivoRouter(data);
});

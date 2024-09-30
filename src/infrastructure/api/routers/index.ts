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

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.get('/evento/:id', obtenerEventoRouter);
    application.get('/eventos', obtenerEventosRouter);
    application.post('/evento', guardarEventoRouter);
    application.post('/evento/inscribir-usuario', inscribirUsuarioEventoRouter);
    application.put('/evento', editarEventoRouter);
    application.delete('/evento/eliminar/:id', eliminarEventoRouter);
    application.get('/eventos/metricas', obtenerMetricasRouter);

    application.post('/usuarios/usuario', crearUsuarioRouter);
    application.get('/usuarios/usuario/:id', obtenerUsuarioRouter);
    application.get('/usuarios/usuarios', obtenerUsuariosRouter);
    application.delete('/usuarios/eliminar/:id', eliminarUsuarioRouter);

    application.get('/plantilla', obtenerPlantillaRouter);
};

import { EventosAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateData } from '../util';
import { IEventoId, IEditarEvento, IEvento, IUsuarioEvento } from '@application/data';
import { eventoIdSchema, eventoSchema, usuarioEventoSchema, editarEventoSchema } from '../schemas';

export const obtenerEventoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const { id } = validateData<IEventoId>(eventoIdSchema, req.params);
    const response = await eventosAppService.obtenerEventoService(id);
    return reply.send({ ...response });
};

export const obtenerEventosRouter = async (_req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const response = await eventosAppService.obtenerEventosService();
    return reply.send({ ...response });
};

export const guardarEventoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const data = validateData<IEvento>(eventoSchema, req.body);
    const response = await eventosAppService.guardarEventoService(data);
    return reply.send({ ...response });
};

export const inscribirUsuarioEventoRouter = async (
    req: FastifyRequest,
    reply: FastifyReply,
): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const data = validateData<IUsuarioEvento>(usuarioEventoSchema, req.body);
    const response = await eventosAppService.inscribirUsuarioEventoService(data);
    return reply.send({ ...response });
};

export const editarEventoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const data = validateData<IEditarEvento>(editarEventoSchema, req.body);
    const response = await eventosAppService.editarEventoService(data);
    return reply.send({ ...response });
};

export const eliminarEventoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const { id } = validateData<IEventoId>(eventoIdSchema, req.params);
    const response = await eventosAppService.eliminarEventoService(id);
    return reply.send({ ...response });
};

export const obtenerMetricasRouter = async (
    _req: FastifyRequest,
    reply: FastifyReply,
): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const response = await eventosAppService.obtenerMetricasService();
    return reply.send({ ...response });
};

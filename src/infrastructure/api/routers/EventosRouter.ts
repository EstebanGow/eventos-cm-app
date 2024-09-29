import { EventosAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateData } from '../util';
import { IEventoId, IEditarEvento, IEvento, IUsuarioEvento } from '@application/data';
import { IEventoIdSchema, IEventoSchema, IUsuarioEventoSchema } from '../schemas';
import { IEditarEventoSchema } from '../schemas/IEditarEventoSchema';

export const obtenerEventoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const { id } = validateData<IEventoId>(IEventoIdSchema, req.params);
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
    const data = validateData<IEvento>(IEventoSchema, req.body);
    const response = await eventosAppService.guardarEventoService(data);
    return reply.send({ ...response });
};

export const inscribirUsuarioEventoRouter = async (
    req: FastifyRequest,
    reply: FastifyReply,
): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const data = validateData<IUsuarioEvento>(IUsuarioEventoSchema, req.body);
    const response = await eventosAppService.inscribirUsuarioEventoService(data);
    return reply.send({ ...response });
};

export const editarEventoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const data = validateData<IEditarEvento>(IEditarEventoSchema, req.body);
    const response = await eventosAppService.editarEventoService(data);
    return reply.send({ ...response });
};

export const eliminarEventoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const { id } = validateData<IEventoId>(IEventoIdSchema, req.params);
    const response = await eventosAppService.eliminarEventoService(id);
    return reply.send({ ...response });
};

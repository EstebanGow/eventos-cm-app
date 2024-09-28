import { EventosAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';

export const obtenerEventoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const { id } = req;
    const response = await eventosAppService.obtenerEventoService();
    return reply.send({ ...response, id });
};

export const obtenerEventosRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const { id } = req;
    const response = await eventosAppService.obtenerEventosService();
    return reply.send({ ...response, id });
};

export const guardarEventoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const { id } = req;
    const response = await eventosAppService.guardarEventoService();
    return reply.send({ ...response, id });
};

export const editarEventoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(EventosAppService);
    const { id } = req;
    const response = await eventosAppService.editarEventoService();
    return reply.send({ ...response, id });
};

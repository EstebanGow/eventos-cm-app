import { PlantillasAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';

export const obtenerPlantillaRouter = async (
    _req: FastifyRequest,
    reply: FastifyReply,
): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(PlantillasAppService);
    const response = await eventosAppService.obtenerPlantillaService();
    return reply.send({ ...response });
};

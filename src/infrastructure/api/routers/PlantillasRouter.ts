import { ICargaMasiva } from '@application/data';
import { PlantillasAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateData } from '../util';
import { cargaMasivaSchema } from '../schemas';

export const obtenerPlantillaRouter = async (
    _req: FastifyRequest,
    reply: FastifyReply,
): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(PlantillasAppService);
    const response = await eventosAppService.obtenerPlantillaService();
    return reply.send({ ...response });
};

export const procesarArchivoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(PlantillasAppService);
    const data = validateData<ICargaMasiva>(cargaMasivaSchema, req.body);
    const response = await eventosAppService.procesarArchivoService(data);
    return reply.send({ ...response });
};

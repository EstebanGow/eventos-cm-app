import { IArchivoId, ICargaMasiva, IEventoImportacion } from '@application/data';
import { PlantillasAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateData } from '../util';
import { archivoIdSchema, cargaMasivaSchema } from '../schemas';

export const obtenerPlantillaRouter = async (
    _req: FastifyRequest,
    reply: FastifyReply,
): Promise<FastifyReply | void> => {
    const plantillasAppService = DEPENDENCY_CONTAINER.get(PlantillasAppService);
    const response = await plantillasAppService.obtenerPlantillaService();
    return reply.send({ ...response });
};

export const cargarArchivoRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const plantillasAppService = DEPENDENCY_CONTAINER.get(PlantillasAppService);
    const data = validateData<ICargaMasiva>(cargaMasivaSchema, req.body);
    const response = await plantillasAppService.cargarArchivoService(data);
    return reply.send({ ...response });
};

export const procesarArchivoRouter = async (data: IEventoImportacion): Promise<any> => {
    const plantillasAppService = DEPENDENCY_CONTAINER.get(PlantillasAppService);
    const response = await plantillasAppService.procesarArchivoService(data);
    return { ...response };
};

export const obtenerEstadoCargaEventosRouter = async (
    req: FastifyRequest,
    reply: FastifyReply,
): Promise<FastifyReply | void> => {
    const plantillasAppService = DEPENDENCY_CONTAINER.get(PlantillasAppService);
    const data = validateData<IArchivoId>(archivoIdSchema, req.params);
    const response = await plantillasAppService.obtenerEstadoCargaEventosService(data.id);
    return reply.send({ ...response });
};

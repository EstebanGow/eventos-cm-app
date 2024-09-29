import { UsuariosAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateData } from '../util';
import { IUsuarioIdSchema, IUsuarioSchema } from '../schemas';
import { IUsuario } from '@application/data/in/IUsuario';
import { IUsuarioId } from '@application/data';

export const crearUsuarioRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(UsuariosAppService);
    const data = validateData<IUsuario>(IUsuarioSchema, req.body);
    const response = await eventosAppService.crearUsuarioService(data);
    return reply.send({ ...response });
};

export const obtenerUsuarioRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(UsuariosAppService);
    const { id } = validateData<IUsuarioId>(IUsuarioIdSchema, req.params);
    const response = await eventosAppService.obtenerUsuarioService(id);
    return reply.send({ ...response });
};

export const obtenerUsuariosRouter = async (
    _req: FastifyRequest,
    reply: FastifyReply,
): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(UsuariosAppService);
    const response = await eventosAppService.obtenerUsuariosService();
    return reply.send({ ...response });
};

export const eliminarUsuarioRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventosAppService = DEPENDENCY_CONTAINER.get(UsuariosAppService);
    const { id } = validateData<IUsuarioId>(IUsuarioIdSchema, req.params);
    const response = await eventosAppService.eliminarUsuarioService(id);
    return reply.send({ ...response });
};

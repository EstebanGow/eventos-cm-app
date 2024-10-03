import { UsuariosAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateData } from '../util';
import { usuarioIdSchema, usuarioSchema } from '../schemas';
import { IUsuario } from '@application/data/in/IUsuario';
import { IUsuarioId } from '@application/data';

export const crearUsuarioRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const usuariosAppService = DEPENDENCY_CONTAINER.get(UsuariosAppService);
    const data = validateData<IUsuario>(usuarioSchema, req.body);
    const response = await usuariosAppService.crearUsuarioService(data);
    return reply.send({ ...response });
};

export const obtenerUsuarioRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const usuariosAppService = DEPENDENCY_CONTAINER.get(UsuariosAppService);
    const { id } = validateData<IUsuarioId>(usuarioIdSchema, req.params);
    const response = await usuariosAppService.obtenerUsuarioService(id);
    return reply.send({ ...response });
};

export const obtenerUsuariosRouter = async (
    _req: FastifyRequest,
    reply: FastifyReply,
): Promise<FastifyReply | void> => {
    const usuariosAppService = DEPENDENCY_CONTAINER.get(UsuariosAppService);
    const response = await usuariosAppService.obtenerUsuariosService();
    return reply.send({ ...response });
};

export const eliminarUsuarioRouter = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const usuariosAppService = DEPENDENCY_CONTAINER.get(UsuariosAppService);
    const { id } = validateData<IUsuarioId>(usuarioIdSchema, req.params);
    const response = await usuariosAppService.eliminarUsuarioService(id);
    return reply.send({ ...response });
};

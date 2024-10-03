import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateData } from '../util';
import { IAuteinticar } from '@application/data';
import { autenticarSchema } from '../schemas';
import { AutenticacionAppService } from '@application/services/AutenticacionAppService';
import { validarToken } from '@domain/services';

export const autenticarUsuarioRouter = async (req: FastifyRequest, reply: FastifyReply) => {
    const autenticarAppService = DEPENDENCY_CONTAINER.get(AutenticacionAppService);
    const data = validateData<IAuteinticar>(autenticarSchema, req.body);
    const response = await autenticarAppService.autenticarUsuarioService(data);
    return reply.send(response);
};

export const verificarTokenRouter = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] ? req.headers.authorization?.split(' ')[1] : '';
        if (!token || token === '') {
            return reply.code(401).send({ error: 'Acceso denegado' });
        }
        const decoded = validarToken(token);
        (req as any).usuario = decoded;
    } catch (error) {
        return reply.code(401).send({ error: 'Token invalido' });
    }
};

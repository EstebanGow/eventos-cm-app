import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateData } from '../util';
import { IAuteinticar } from '@application/data';
import { autenticarSchema } from '../schemas';
import jwt from 'jsonwebtoken';

import { AutenticacionAppService } from '@application/services/AutenticacionAppService';
import { JWT_SECRET } from '@util';

export const autenticarUsuarioRouter = async (req: FastifyRequest, reply: FastifyReply) => {
    const autenticarAppService = DEPENDENCY_CONTAINER.get(AutenticacionAppService);
    const data = validateData<IAuteinticar>(autenticarSchema, req.body);
    const response = await autenticarAppService.autenticarUsuarioService(data);
    return reply.send(response);
};

export const verificarTokenRouter = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return reply.code(401).send({ error: 'Acceso denegado' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).usuario = decoded;
    } catch (error) {
        return reply.code(401).send({ error: 'Token invalido' });
    }
};

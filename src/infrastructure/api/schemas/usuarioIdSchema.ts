import { IEventoId } from '@application/data';
import Joi from 'joi';

export const usuarioIdSchema = Joi.object<IEventoId>({
    id: Joi.number().required(),
});

import { IEventoId } from '@application/data';
import Joi from 'joi';

export const eventoIdSchema = Joi.object<IEventoId>({
    id: Joi.number().integer().required().example(8),
});

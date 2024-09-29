import { IEventoId } from '@application/data';
import Joi from 'joi';

export const IEventoIdSchema = Joi.object<IEventoId>({
    id: Joi.number().required(),
});

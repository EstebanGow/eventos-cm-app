import { IEventoId } from '@application/data';
import Joi from 'joi';

export const IUsuarioIdSchema = Joi.object<IEventoId>({
    id: Joi.number().required(),
});

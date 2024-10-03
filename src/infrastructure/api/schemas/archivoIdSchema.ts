import Joi from 'joi';
import { IArchivoId } from '@application/data';
export const archivoIdSchema = Joi.object<IArchivoId>({
    id: Joi.number().integer().required(),
});

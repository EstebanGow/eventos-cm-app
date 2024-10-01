import { IAuteinticar } from '@application/data';
import Joi from 'joi';

export const IAutenticarSchema = Joi.object<IAuteinticar>({
    usuario: Joi.string().required(),
    clave: Joi.string().required(),
});

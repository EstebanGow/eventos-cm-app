import { IUsuarioEvento } from '@application/data';
import Joi from 'joi';

export const IUsuarioEventoSchema = Joi.object<IUsuarioEvento>({
    idEvento: Joi.number().required(),
    usuario: Joi.object({
        nombres: Joi.string().required(),
        apellidos: Joi.string().required(),
        identificacion: Joi.string().required(),
        telefono: Joi.string().required(),
    }),
});

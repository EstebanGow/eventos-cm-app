import { IUsuario } from '@application/data';
import Joi from 'joi';

export const IUsuarioSchema = Joi.object<IUsuario>({
    nombres: Joi.string().required(),
    apellidos: Joi.string().required(),
    identificacion: Joi.string().required(),
    telefono: Joi.string().required(),
    tipo_usuario: Joi.number().required().valid(1, 2),
});

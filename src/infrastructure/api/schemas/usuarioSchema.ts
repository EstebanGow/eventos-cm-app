import { IUsuario } from '@application/data';
import Joi from 'joi';

export const usuarioSchema = Joi.object<IUsuario>({
    nombres: Joi.string().required().example('Carlos'),
    apellidos: Joi.string().required().example('Gomez'),
    identificacion: Joi.string().required().example('12005114'),
    telefono: Joi.string().required().example('3128524588'),
    tipo_usuario: Joi.number().integer().required().valid(1, 2).description('1: Estandar, 2: VIP'),
});

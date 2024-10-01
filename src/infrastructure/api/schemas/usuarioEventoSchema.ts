import { IUsuarioEvento } from '@application/data';
import Joi from 'joi';

export const usuarioEventoSchema = Joi.object<IUsuarioEvento>({
    idEvento: Joi.number().integer().required().example(1),
    idUsuario: Joi.number().integer().required().example(3),
});

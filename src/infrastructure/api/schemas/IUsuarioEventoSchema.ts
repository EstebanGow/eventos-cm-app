import { IUsuarioEvento } from '@application/data';
import Joi from 'joi';

export const IUsuarioEventoSchema = Joi.object<IUsuarioEvento>({
    idEvento: Joi.number().required(),
    idUsuario: Joi.number().required(),
});

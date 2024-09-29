import { IEditarEvento } from '@application/data';
import Joi from 'joi';

export const IEditarEventoSchema = Joi.object<IEditarEvento>({
    idEvento: Joi.number().required(),
    nombre: Joi.string().required().max(120),
    fecha: Joi.string().isoDate().required(),
    horaInicio: Joi.string().required(),
    horaFin: Joi.string().required(),
    descripcion: Joi.string().required(),
    precio: Joi.number().required(),
    capacidad: Joi.number().required(),
    tipoEvento: Joi.number().required().valid(1, 2),
    direccion: Joi.object({
        pais: Joi.string().required(),
        ciudad: Joi.string().required(),
        direccion: Joi.string().required(),
    }),
});

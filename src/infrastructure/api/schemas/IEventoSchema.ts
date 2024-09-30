import { IEvento } from '@application/data';
import Joi from 'joi';

export const IEventoSchema = Joi.object<IEvento>({
    nombre: Joi.string().required().max(120),
    fecha: Joi.string().required(),
    horaInicio: Joi.string().required(),
    horaFin: Joi.string().required(),
    descripcion: Joi.string().required(),
    precio: Joi.number().integer().required(),
    capacidad: Joi.number().integer().required(),
    tipoEvento: Joi.number().integer().required().valid(1, 2),
    direccion: Joi.object({
        pais: Joi.string().required(),
        ciudad: Joi.string().required(),
        direccion: Joi.string().required(),
    }),
});

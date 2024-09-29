import { IEvento } from '@application/data';
import Joi from 'joi';

export const IEventoSchema = Joi.object<IEvento>({
    nombre: Joi.string().required().max(120),
    fechaHora: Joi.string().isoDate().required(),
    direccion: Joi.object({
        pais: Joi.string().required(),
        ciudad: Joi.string().required(),
        direccion: Joi.string().required(),
    }),
});

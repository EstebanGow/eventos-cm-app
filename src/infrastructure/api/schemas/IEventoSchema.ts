import { IEvento } from '@application/data';
import Joi from 'joi';

export const IEventoSchema = Joi.object<IEvento>({
    nombre: Joi.string().required().max(120).example('Reunion'),
    fecha: Joi.string().required().example('2024-10-07'),
    horaInicio: Joi.string().required().example('10:00'),
    horaFin: Joi.string().required().example('11:00'),
    descripcion: Joi.string().required().example('Almuerzo'),
    precio: Joi.number().integer().required().example(120000),
    capacidad: Joi.number().integer().required().example(20),
    tipoEvento: Joi.number().integer().required().valid(1, 2).example(1).description('tipo evento 1: Abierto, 2: VIP'),
    direccion: Joi.object({
        pais: Joi.string().required().example('Colombia'),
        ciudad: Joi.string().required().example('Medellin'),
        direccion: Joi.string().required().example('Calle 70 # 30 31'),
    }),
});

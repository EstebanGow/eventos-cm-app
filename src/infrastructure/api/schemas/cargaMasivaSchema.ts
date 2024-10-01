import { ICargaMasiva } from '@application/data';
import Joi from 'joi';

export const cargaMasivaSchema = Joi.object<ICargaMasiva>({
    archivo: Joi.string().required(),
});

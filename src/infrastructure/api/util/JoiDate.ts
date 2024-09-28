import Joi from 'joi';
export const JoiDate = Joi.alternatives([
    Joi.object().keys({ _seconds: Joi.number(), _nanoseconds: Joi.number() }),
    Joi.date(),
    Joi.string(),
    null,
]).required();

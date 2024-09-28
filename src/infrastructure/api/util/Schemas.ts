import Joi from 'joi';
import { parse, decode } from '@util';
import { pubSubSchema, PubSubPayload } from '@infrastructure/api/schemas';
import { BadMessageException } from '@domain/exceptions';

type Schema = Joi.ObjectSchema | Joi.ArraySchema;
type Body = Record<string, unknown> | undefined | unknown;

export const validateData = <T>(schema: Schema, dataToValidate: Body): T => {
    if (dataToValidate) {
        const { error, value } = schema.validate(dataToValidate, { convert: true });
        if (error) {
            console.error(`schemaError: ${JSON.stringify(error)}`);
            throw new BadMessageException(error.message, 'Los valores de entrada no son correctos.');
        }
        return value;
    }
    throw new Error('mensaje indefinido');
};

export const validateDataPubSub = <T>(schema: Schema, dataToValidate: Body): T => {
    const pubSubPayload = validatePubSub(dataToValidate);
    if (pubSubPayload) {
        const decodeMessage = parse(decode(pubSubPayload.message.data));
        const { error, value } = schema.validate(decodeMessage, { convert: true });
        if (error) {
            console.error(`schemaError: ${JSON.stringify(error)}`);
            throw new BadMessageException(error.message, 'error validanto data de entrada');
        }
        return value;
    }
    throw new BadMessageException('no se encontró data de pubsub', 'error validanto data de entrada');
};

export const validatePubSub = (dataToValidate: Body): PubSubPayload | null => {
    if (dataToValidate) {
        const { error, value } = pubSubSchema.validate(dataToValidate, { convert: true });
        if (!error) return value;
    }
    return null;
};

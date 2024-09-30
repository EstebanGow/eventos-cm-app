import { PREFIX, HOST, NODE_ENV } from '@util';
import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import joiToSwagger from 'joi-to-swagger';

export const swagger_config: FastifyDynamicSwaggerOptions = {
    routePrefix: `${PREFIX}/docs`,
    swagger: {
        info: {
            title: 'Microservice Template',
            description: 'Este microservicio se encarga de guardar la configuración inicial Firestore',
            version: '0.1.0',
            contact: {
                name: 'Coordinadora Mercantil S.A',
                url: 'http://www.coordinadora.com/',
                email: 'it@coordinadora.com',
            },
        },
        host: HOST,
        schemes: NODE_ENV === 'local' ? ['http'] : ['https'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
    hideUntagged: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateSchemaFromObject(objetoLiteral: any, description = ''): any {
    const object: any = {
        properties: {} as any,
        description,
        type: typeof objetoLiteral,
    };
    if (['string', 'number', 'boolean'].includes(object.type)) {
        object.example = objetoLiteral;
    }
    for (const prop in objetoLiteral) {
        // eslint-disable-next-line no-prototype-builtins
        if (!objetoLiteral.hasOwnProperty(prop)) {
            continue;
        }
        if ([null, undefined].includes(objetoLiteral[prop])) {
            objetoLiteral[prop] = 'unknown';
        }
        const type = typeof objetoLiteral[prop];
        object.properties[prop] = { type, example: objetoLiteral[prop] === 'unknown' ? null : objetoLiteral[prop] };
        if (Array.isArray(objetoLiteral[prop])) {
            if (objetoLiteral[prop].length > 1) {
                throw new TypeError('Solo se permite 1 objeto de ejemplo para el esquema');
            }
            const firstExampleObj = objetoLiteral[prop][0];
            if (firstExampleObj) {
                object.properties[prop] = {
                    type: 'array',
                    items: generateSchemaFromObject(firstExampleObj, description),
                };
                continue;
            }
            object.properties[prop] = { type: 'array' };
            continue;
        }
        if (type === 'object') {
            object.properties[prop] = generateSchemaFromObject(objetoLiteral[prop], description);
        }
    }
    return object;
}
export const beauty = generateSchemaFromObject;
export const validationParser = (schema: any) => joiToSwagger(schema).swagger;

export const DEFAULT_400_ERROR_SCHEMA = {
    isError: true,
    message: 'Los valores de entrada no son correctos.',
    code: 'BAD_MESSAGE',
    cause: 'Error',
    validationContext: 'params',
    statusCode: 400,
};
export const DEFAULT_500_ERROR_SCHEMA = {
    isError: true,
    message: 'example message',
    code: 'POSTGRES_ERROR',
    statusCode: 500,
    cause: 'REPOSITORY_ERROR',
};

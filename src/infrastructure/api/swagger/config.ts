import { PREFIX, HOST, NODE_ENV } from '@util';
import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

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

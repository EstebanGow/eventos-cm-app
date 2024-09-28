import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import formbody from '@fastify/formbody';
import { validatePubSub } from '@infrastructure/api';
import { decode, parse } from '@util';

type Payload = Record<string, unknown>;

export const middlewares = (application: FastifyInstance): void => {
    application.register(cors);
    application.register(formbody);
    application.register(helmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
        },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    application.addHook<Payload, any>('onSend', async (req, reply, payload) => {
        const { id, method, url, headers, params, query, body } = req;
        const isPubSub = await validatePubSub(body);
        console.log(
            JSON.stringify({
                application: process.env.SERVICE_NAME ?? 'SERVICE_NAME NOT FOUND',
                id,
                method,
                url,
                request: {
                    headers,
                    body: body ?? {},
                    buffer: isPubSub ? parse(decode(isPubSub.message.data)) : {},
                    messageId: isPubSub ? isPubSub.message.messageId : null,
                    params,
                    query,
                },
                response: {
                    statusCode: reply.statusCode,
                    payload,
                },
            }),
        );
    });
};

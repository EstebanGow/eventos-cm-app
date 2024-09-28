// libraries
import 'reflect-metadata';
import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config();
import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import { randomBytes } from 'crypto';
import { PREFIX } from '@util';
import { initRoutes } from '@infrastructure/api/routers';
import { middlewares, errorHandler } from '@infrastructure/api/middlewares';

import { swagger_config } from '@infrastructure/api/swagger';

export const application = fastify({
    genReqId: (_) => randomBytes(20).toString('hex'),
});

// middlewares
middlewares(application);
errorHandler(application);

//fastify swagger
application.register(fastifySwagger, swagger_config);

// routes
application.register(initRoutes, { prefix: PREFIX });

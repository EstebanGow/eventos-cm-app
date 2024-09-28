import * as redis from 'redis';
import { log, error } from 'console';
import { REDIS_HOST, REDIS_PORT } from '@util';

const url = `redis://${REDIS_HOST}:${REDIS_PORT}`;
export const redisClient = redis.createClient({ url });
redisClient
    .connect()
    .then(() => log('[INFO] Conectado al servidor de redis'))
    .catch((err) => log('[ERROR] No se pudo conectar a redis: ', err));

redisClient.on('error', (err) => error('ERR_REDIS:', err.message));

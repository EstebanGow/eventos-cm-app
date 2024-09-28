export const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

export const GCP_PROJECT = process.env.GCP_PROJECT;
export const SERVICE_NAME = process.env.SERVICE_NAME || 'eventos-cm-app';
export const PORT = process.env.PORT || 8081;
export const HOST = process.env.HOST || 'localhost';
export const REDIS_PORT = process.env.REDIS_PORT || 6379;
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

export const PREFIX = `/${SERVICE_NAME}`;

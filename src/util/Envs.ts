export const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'local';

export const GCP_PROJECT = process.env.GCP_PROJECT;

export const PREFIX = `/${process.env.DOMAIN}/${process.env.SERVICE_NAME}`;

export const HOST = process.env.HOST || 'localhost';

export const API_EXAMPLE = process.env.API_EXAMPLE;

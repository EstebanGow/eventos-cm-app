import { IConnectionParameters } from '../models';

export const DEFAULT_CONNECTION_PARAMETERS: IConnectionParameters = {
    port: 5432,
    max: 30,
    idleTimeoutMillis: 3000,
    query_timeout: 7000,
    connect_timeout: 62000,
};

export const CM_CONECTION_PARAMETERS: IConnectionParameters = {
    ...DEFAULT_CONNECTION_PARAMETERS,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DB_NAME,
};

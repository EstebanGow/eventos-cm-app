import dotenv from 'dotenv';
dotenv.config();
import pgPromise, { IMain, IDatabase } from 'pg-promise';
import { NODE_ENV } from '@util';
import { IConnectionParameters, IDataBase, IEnvironments } from '../models';
import { CM_CONECTION_PARAMETERS } from '.';

const getConnectionParameters = (db: string): IConnectionParameters => {
    const DATABASES: IEnvironments<IConnectionParameters> = {
        development: { host: process.env.POSTGRES_HOST },
        testing: { host: process.env.POSTGRES_HOST },
        production: { host: process.env.POSTGRES_HOST },
    };

    const DATABASE = DATABASES[NODE_ENV] || DATABASES.development;
    console.log('DATABASE => ', DATABASE);
    const CONEXION: IDataBase<IConnectionParameters> = {
        db: { ...CM_CONECTION_PARAMETERS, ...DATABASE },
    };
    return CONEXION[db];
};

export const pgCm: IMain = pgPromise();
export const db = pgCm(getConnectionParameters('db')) as IDatabase<IMain>;

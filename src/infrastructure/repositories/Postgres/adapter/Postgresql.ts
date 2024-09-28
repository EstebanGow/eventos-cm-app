import dotenv from 'dotenv';
dotenv.config();
import pgPromise, { IMain, IDatabase } from 'pg-promise';
import { NODE_ENV } from '@util';
import { IConnectionParameters, IDataBase, IEnvironments } from '../models';
import { CM_CONECTION_PARAMETERS } from '.';

const getConnectionParameters = (db: string): IConnectionParameters => {
    const DATABASES: IEnvironments<IConnectionParameters> = {
        development: { host: 'localhost' },
        testing: { host: 'localhost' },
        production: { host: 'localhost' },
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

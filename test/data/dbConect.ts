import { IMemoryDb } from 'pg-mem';

export const dbConect = (dbmem: IMemoryDb) => {
    return dbmem.adapters.createPgPromise();
};

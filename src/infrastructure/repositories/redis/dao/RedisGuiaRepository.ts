import { injectable } from 'inversify';
import { RedisClientType } from 'redis';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { RedisRepository } from '@domain/repository';

@injectable()
export class RedisEventosRepository implements RedisRepository {
    private redis = DEPENDENCY_CONTAINER.get<RedisClientType>(TYPES.RedisClient);
    async getOne(data: any): Promise<any> {
        try {
            const datos = await this.redis.get(data);
            if (datos) return { ...JSON.parse(datos) };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getSource(data: any): Promise<any> {
        const getUnit = await this.redis.get(`${data}`);
        if (getUnit) {
            const { fuente } = JSON.parse(getUnit) as any;
            return fuente;
        }
        return null;
    }

    async insertOne(data: any, nombre: string, timeExp = 691200): Promise<any> {
        try {
            await this.redis.setEx(nombre, timeExp, JSON.stringify(data));
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getToken(data: string): Promise<string | null> {
        try {
            return await this.redis.get(data);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

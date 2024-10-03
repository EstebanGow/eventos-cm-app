export interface RedisRepository {
    getOne(data: any): Promise<any>;
    insertOne(data: any, nombre: string): Promise<any>;
    getSource(data: any): Promise<any>;
    getToken(data: string): Promise<string | null>;
    deleteSource(data: string): Promise<void>;
}

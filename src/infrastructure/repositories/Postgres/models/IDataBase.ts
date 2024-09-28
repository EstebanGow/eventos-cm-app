export interface IDataBase<T> {
    [key: string]: T;
    db: T;
}

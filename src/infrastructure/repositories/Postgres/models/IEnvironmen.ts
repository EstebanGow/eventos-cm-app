export interface IEnvironments<T> {
    [key: string]: T;
    development: T;
    testing: T;
    production: T;
}

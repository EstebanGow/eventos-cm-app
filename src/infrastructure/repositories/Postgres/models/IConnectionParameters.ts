export interface IConnectionParameters {
    port?: number;
    max?: number;
    connect_timeout?: number;
    statement_timeout?: number;
    idleTimeoutMillis?: number;
    query_timeout?: number;
    keepalives?: number;
    keepalives_idle?: number;
    user?: string;
    database?: string;
    password?: string;
    host?: string;
}

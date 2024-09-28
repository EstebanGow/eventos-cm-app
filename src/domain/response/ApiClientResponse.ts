export interface IResponseApiClient<T> {
    isError: boolean;
    message: string;
    data: T;
    timestamp: Date;
    id: string;
}

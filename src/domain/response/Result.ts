import { Exception } from '@domain/exceptions';

export interface Response<T> {
    isError: boolean;
    data: T;
    timestamp: Date;
}

export class Result {
    static ok<T>(data?: T): Response<T | null> {
        return {
            isError: false,
            data: data || null,
            timestamp: new Date(),
        };
    }

    static failure<E = Exception>(exception: E): E {
        throw exception;
    }
}

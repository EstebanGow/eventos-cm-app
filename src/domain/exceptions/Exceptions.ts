import { ErrorCode, PostgresErrorCode, StatusCode } from './ErrorCode';

export abstract class Exception {
    isError: boolean;
    message: string;
    code: ErrorCode;
    statusCode: number;
    cause: string | null;

    constructor(message: string, code: ErrorCode, statusCode: number, cause?: string) {
        this.isError = true;
        this.message = message;
        this.code = code;
        this.statusCode = statusCode;
        this.cause = cause || null;
    }
}

export class BadMessageException extends Exception {
    constructor(cause: string, message: string) {
        super(message, ErrorCode.BAD_MESSAGE, StatusCode.OK, cause);
    }
}
export class ApiRestException extends Exception {
    constructor(message: string, cause: string) {
        super(message, ErrorCode.API_CLIENT_ERROR, StatusCode.INTERNAL_ERROR, cause);
    }
}

export class NotFoundException extends Exception {
    constructor(cause: string, message: string) {
        super(message, ErrorCode.REPOSITORY_ERROR, StatusCode.NOT_FOUND, cause);
    }
}

export class RepositoryException extends Exception {
    constructor(
        message: string,
        StatusCode: number,
        ErrorCode: ErrorCode,
        cause = 'Ocurrió un error en el repositorio',
    ) {
        super(message, ErrorCode, StatusCode, cause);
    }
}

export class PubSubException extends Exception {
    constructor(message: string, cause: string) {
        super(message, ErrorCode.PUBSUB_ERROR, StatusCode.INTERNAL_ERROR, cause);
    }
}

export class PostgresException extends Exception {
    constructor(cause: string, code: number | string, stack: string) {
        let message = 'Postgres Error:';
        switch (code) {
            case 'P0001':
                message += 'Error de servidor ' + stack;
                break;
            case '23505':
                message += 'Intentando insertar llave única duplicada - ' + stack;
                break;
            case '23514':
                message += 'Acción viola una restricción de la tabla - ' + stack;
                break;
            case '23502':
                message += 'Insertando una llave nula que no puede serlo - ' + stack;
                break;
            case '42883':
                message += 'llamado a funcion Inexistente - ' + stack;
                break;
            case '42P01':
                message += 'llamado a tabla Inexistente - ' + stack;
                break;
            case '42P02':
                message += 'llamado a parametro Inexistente - ' + stack;
                break;
            case '42704':
                message += 'llamado a objeto Inexistente - ' + stack;
                break;
            case '42703':
                message += 'llamado a columna Inexistente - ' + stack;
                break;
            case '57014':
                message += 'Consulta cancelada - ' + stack;
                break;
            case 'ECONNREFUSED':
                message += 'Error de conexión - ' + stack;
                break;
            default:
                message += PostgresErrorCode.RETRY;
                break;
        }
        super(message, ErrorCode.UNKNOWN_ERROR, StatusCode.INTERNAL_ERROR, cause);
    }
}

export class FirestoreException extends Exception {
    constructor(code: number | string | undefined, message: string) {
        const fsError = ErrorCode.REPOSITORY_ERROR;
        switch (code) {
            case 1:
            case '1':
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Firestore action cancelled');
                break;
            case 2:
            case '2':
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Firestore unknown error');
                break;
            case 3:
            case '3':
                super(message, fsError, StatusCode.OK, 'Firestore invalid argument');
                break;
            case 4:
            case '4':
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Firestore deadline exceeded');
                break;
            case 5:
            case '5':
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Update nonexistent document');
                break;
            case 6:
            case '6':
                super(message, fsError, StatusCode.OK, 'Firestore document already exists');
                break;
            case 7:
            case '7':
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Firestore permission denied');
                break;
            case 8:
            case '8':
                super(message, fsError, StatusCode.OK, 'Firestore resource exhausted');
                break;
            case 9:
            case '9':
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Firestore precondition failed');
                break;
            default:
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Defaulted unkwnown fs error');
                break;
        }
    }
}

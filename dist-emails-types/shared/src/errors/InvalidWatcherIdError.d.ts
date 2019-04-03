import { AppError } from 'shared/errors/AppError';
export declare class InvalidWatcherIdError extends AppError {
    constructor(value: string);
}

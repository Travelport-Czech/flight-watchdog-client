import { AppError } from 'shared/errors/AppError';
export declare class InvalidStringError extends AppError {
    constructor(value: string);
}

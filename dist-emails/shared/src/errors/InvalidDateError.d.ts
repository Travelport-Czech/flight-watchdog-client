import { AppError } from 'shared/errors/AppError';
export declare class InvalidDateError extends AppError {
    constructor(value: string);
}

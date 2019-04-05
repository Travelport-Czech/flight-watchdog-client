import { AppError } from '@shared/errors/AppError';
export declare class InvalidDateTimeError extends AppError {
    constructor(value: string);
}

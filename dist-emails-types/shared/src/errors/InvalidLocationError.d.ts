import { AppError } from 'shared/errors/AppError';
export declare class InvalidLocationError extends AppError {
    constructor(value: string);
}

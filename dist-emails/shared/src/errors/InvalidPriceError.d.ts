import { AppError } from 'shared/errors/AppError';
export declare class InvalidPriceError extends AppError {
    constructor(value: string);
}

import { AppError } from '@shared/errors/AppError';
export declare class InvalidUrlError extends AppError {
    constructor(value: string);
}

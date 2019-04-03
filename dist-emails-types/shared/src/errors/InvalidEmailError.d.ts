import { AppError } from 'shared/errors/AppError';
export declare class InvalidEmailError extends AppError {
    constructor(value: string);
}

import { AppError } from 'shared/errors/AppError';
import { ValidPrice } from 'shared/validObjects/ValidPrice';
export declare class PriceOperationWithDifferentCurrencyError extends AppError {
    constructor(first: ValidPrice, second: ValidPrice);
}

import { AppError } from 'shared/errors/AppError';
export class PriceOperationWithDifferentCurrencyError extends AppError {
    constructor(first, second) {
        super("Price operation with different currency '" + first.toString() + "' and '" + second.toString() + "'.");
    }
}
//# sourceMappingURL=PriceOperationWithDifferentCurrencyError.js.map
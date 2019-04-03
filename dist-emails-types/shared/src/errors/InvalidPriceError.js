import { AppError } from 'shared/errors/AppError';
export class InvalidPriceError extends AppError {
    constructor(value) {
        super("Invalid price '" + value + "'.");
    }
}
//# sourceMappingURL=InvalidPriceError.js.map
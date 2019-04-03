import { AppError } from 'shared/errors/AppError';
export class InvalidNumberError extends AppError {
    constructor(value) {
        super("Invalid number '" + value + "'.");
    }
}
//# sourceMappingURL=InvalidNumberError.js.map
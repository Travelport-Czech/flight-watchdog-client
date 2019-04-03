import { AppError } from 'shared/errors/AppError';
export class InvalidStringError extends AppError {
    constructor(value) {
        super("Invalid string '" + value + "'.");
    }
}
//# sourceMappingURL=InvalidStringError.js.map
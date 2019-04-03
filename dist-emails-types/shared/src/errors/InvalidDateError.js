import { AppError } from 'shared/errors/AppError';
export class InvalidDateError extends AppError {
    constructor(value) {
        super("Invalid date '" + value + "'.");
    }
}
//# sourceMappingURL=InvalidDateError.js.map
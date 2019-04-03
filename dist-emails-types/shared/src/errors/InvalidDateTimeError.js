import { AppError } from 'shared/errors/AppError';
export class InvalidDateTimeError extends AppError {
    constructor(value) {
        super("Invalid date time '" + value + "'.");
    }
}
//# sourceMappingURL=InvalidDateTimeError.js.map
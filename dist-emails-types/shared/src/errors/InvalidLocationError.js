import { AppError } from 'shared/errors/AppError';
export class InvalidLocationError extends AppError {
    constructor(value) {
        super("Invalid location '" + value + "'.");
    }
}
//# sourceMappingURL=InvalidLocationError.js.map
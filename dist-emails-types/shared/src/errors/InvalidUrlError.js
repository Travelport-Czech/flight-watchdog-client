import { AppError } from 'shared/errors/AppError';
export class InvalidUrlError extends AppError {
    constructor(value) {
        super("Invalid url '" + value + "'.");
    }
}
//# sourceMappingURL=InvalidUrlError.js.map
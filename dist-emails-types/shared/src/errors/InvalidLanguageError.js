import { AppError } from 'shared/errors/AppError';
export class InvalidLanguageError extends AppError {
    constructor(value) {
        super("Invalid language '" + value + "'.");
    }
}
//# sourceMappingURL=InvalidLanguageError.js.map
import { AppError } from 'shared/errors/AppError';
export class InvalidEmailError extends AppError {
    constructor(value) {
        super("Invalid email '" + value + "'.");
    }
}
//# sourceMappingURL=InvalidEmailError.js.map
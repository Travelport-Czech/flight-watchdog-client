import { AppError } from 'shared/errors/AppError';
export class InvalidWatcherIdError extends AppError {
    constructor(value) {
        super("Invalid watcherId '" + value + "'.");
    }
}
//# sourceMappingURL=InvalidWatcherIdError.js.map
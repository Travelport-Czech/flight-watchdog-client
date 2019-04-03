import { AppError } from 'shared/errors/AppError';
import { InvalidWatcherIdError } from 'shared/errors/InvalidWatcherIdError';
import { ValidString } from 'shared/validObjects/ValidString';
export class ValidWatcherId extends ValidString {
    constructor(val) {
        try {
            super(val);
        }
        catch (err) {
            if (!(err instanceof AppError)) {
                throw err;
            }
            throw new InvalidWatcherIdError(err.message);
        }
    }
}
//# sourceMappingURL=ValidWatcherId.js.map
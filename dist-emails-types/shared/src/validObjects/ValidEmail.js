import { AppError } from 'shared/errors/AppError';
import { InvalidEmailError } from 'shared/errors/InvalidEmailError';
import { validateEmail } from 'shared/utils/validateEmail';
import { ValidString } from 'shared/validObjects/ValidString';
export class ValidEmail extends ValidString {
    constructor(val) {
        try {
            super(val);
        }
        catch (err) {
            if (!(err instanceof AppError)) {
                throw err;
            }
            throw new InvalidEmailError(err.message);
        }
        if (!validateEmail(this.value)) {
            throw new InvalidEmailError(this.value);
        }
    }
}
//# sourceMappingURL=ValidEmail.js.map
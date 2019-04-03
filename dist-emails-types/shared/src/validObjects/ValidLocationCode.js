import { AppError } from 'shared/errors/AppError';
import { InvalidLocationError } from 'shared/errors/InvalidLocationError';
import { ValidString } from 'shared/validObjects/ValidString';
const inputRegexp = new RegExp(/^[A-Z]{3}$/);
const validate = (val) => {
    if (!inputRegexp.test(val)) {
        throw new InvalidLocationError(val);
    }
};
export class ValidLocationCode extends ValidString {
    constructor(val) {
        try {
            super(val);
        }
        catch (err) {
            if (!(err instanceof AppError)) {
                throw err;
            }
            throw new InvalidLocationError(err.message);
        }
        validate(this.value);
    }
}
//# sourceMappingURL=ValidLocationCode.js.map
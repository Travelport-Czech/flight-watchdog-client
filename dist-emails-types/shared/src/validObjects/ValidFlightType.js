import { AppError } from 'shared/errors/AppError';
import { ValidString } from 'shared/validObjects/ValidString';
const validate = (val) => {
    if (val === 'return') {
        return val;
    }
    if (val === 'oneway') {
        return val;
    }
    throw new AppError(`Bad Flight type: ${val}`);
};
export class ValidFlightType extends ValidString {
    constructor(val) {
        try {
            super(val);
        }
        catch (err) {
            if (!(err instanceof AppError)) {
                throw err;
            }
            throw new AppError(`Flight type is not string: ${err.message}`);
        }
        validate(this.value);
    }
    toString() {
        return validate(this.value);
    }
    isReturn() {
        return this.value === 'return';
    }
    isOneway() {
        return this.value === 'oneway';
    }
}
//# sourceMappingURL=ValidFlightType.js.map
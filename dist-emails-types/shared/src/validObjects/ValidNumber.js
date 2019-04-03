import { InvalidNumberError } from 'shared/errors/InvalidNumberError';
const validate = (val) => {
    if (typeof val !== 'number') {
        throw new InvalidNumberError(typeof val === 'string' ? val.toString() : '');
    }
    if (val !== parseInt(val.toString(), 10)) {
        throw new InvalidNumberError(val.toString());
    }
    return val;
};
export class ValidNumber {
    constructor(val) {
        this.val = validate(val);
    }
    get value() {
        return this.val;
    }
    toString() {
        return this.val.toString();
    }
    get [Symbol.toStringTag]() {
        return this.toString();
    }
    toJSON() {
        return this.val;
    }
}
//# sourceMappingURL=ValidNumber.js.map
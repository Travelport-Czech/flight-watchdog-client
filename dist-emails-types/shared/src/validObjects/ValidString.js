import { InvalidStringError } from 'shared/errors/InvalidStringError';
const validate = (val) => {
    if (typeof val !== 'string') {
        throw new InvalidStringError(JSON.stringify(val) + ' is type ' + typeof val);
    }
    if (!val) {
        throw new InvalidStringError(val);
    }
    return val;
};
export class ValidString {
    constructor(val) {
        this.val = validate(val);
    }
    get value() {
        return this.val;
    }
    isSame(second) {
        return this.toString() === second.toString();
    }
    isNotSame(second) {
        return !this.isSame(second);
    }
    toString() {
        return this.val;
    }
    get [Symbol.toStringTag]() {
        return this.toString();
    }
    toJSON() {
        return this.toString();
    }
}
//# sourceMappingURL=ValidString.js.map
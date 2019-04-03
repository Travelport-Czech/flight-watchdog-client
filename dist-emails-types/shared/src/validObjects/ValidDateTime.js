import * as moment from 'moment';
import { InvalidDateTimeError } from 'shared/errors/InvalidDateTimeError';
import { ValidDate } from 'shared/validObjects/ValidDate';
const dateRegexp = /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/;
export const formatSystemDateTime = 'YYYY-MM-DD HH:mm:ss';
const validate = (val) => {
    if (typeof val !== 'string') {
        throw new InvalidDateTimeError(JSON.stringify(val));
    }
    if (!val) {
        throw new InvalidDateTimeError(val);
    }
    return val;
};
const convertToMoment = (val) => {
    const result = val.match(dateRegexp);
    if (!result) {
        throw new InvalidDateTimeError(val);
    }
    const momentVal = moment(val, formatSystemDateTime);
    if (!momentVal.isValid()) {
        throw new InvalidDateTimeError(val);
    }
    return momentVal;
};
export class ValidDateTime {
    constructor(val) {
        this.formatToSystem = () => {
            return this.moment.format(formatSystemDateTime);
        };
        this.formatToSystemDate = () => {
            return this.moment.format(formatSystemDateTime);
        };
        this.getValidDate = () => {
            return new ValidDate(this.formatToSystemDate().substring(0, 10));
        };
        this.isToday = () => {
            return this.getValidDate().isToday();
        };
        this.val = validate(val);
        convertToMoment(this.val);
    }
    get value() {
        return this.val;
    }
    get moment() {
        return convertToMoment(this.val);
    }
    toString() {
        return this.formatToSystem();
    }
    get [Symbol.toStringTag]() {
        return this.toString();
    }
    toJSON() {
        return this.toString();
    }
}
//# sourceMappingURL=ValidDateTime.js.map
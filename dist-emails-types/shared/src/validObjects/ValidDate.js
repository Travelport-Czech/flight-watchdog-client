import * as moment from 'moment';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { InvalidDateError } from 'shared/errors/InvalidDateError';
import { Text } from 'shared/translation/Text';
import { TranslationEnum } from 'shared/translation/TranslationEnum';
import { getActualDate, getActualMoment } from 'shared/utils/timebased';
const dateRegexp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
export const formatSystemDate = 'YYYY-MM-DD';
const validate = (val) => {
    if (typeof val !== 'string') {
        throw new InvalidDateError(JSON.stringify(val));
    }
    if (!val) {
        throw new InvalidDateError(val);
    }
    return val;
};
const convertToMoment = (val) => {
    const result = val.match(dateRegexp);
    if (!result) {
        throw new InvalidDateError(val);
    }
    const momentVal = moment(val, formatSystemDate);
    if (!momentVal.isValid()) {
        throw new InvalidDateError(val);
    }
    return momentVal;
};
export class ValidDate {
    constructor(val) {
        this.isInPast = () => {
            return this.moment.diff(getActualMoment()) < 0;
        };
        this.isToday = () => {
            return getActualDate().formatToSystem() === this.formatToSystem();
        };
        this.isInIntervalDays = (days) => {
            const limit = getActualMoment().subtract(days, 'days');
            return this.moment.isAfter(limit);
        };
        this.isBefore = (date) => {
            return this.moment.isBefore(date.value);
        };
        this.isAfter = (date) => {
            return this.moment.isAfter(date.value);
        };
        this.isSame = (date) => {
            return this.moment.isSame(date.value);
        };
        this.formatToSystem = () => {
            return this.moment.format(formatSystemDate);
        };
        this.formatToLocal = () => {
            return this.moment.format(renderToStaticMarkup(React.createElement(Text, { name: TranslationEnum.FormatDate })));
        };
        this.formatToLocalDayMonth = () => {
            return this.moment.format(renderToStaticMarkup(React.createElement(Text, { name: TranslationEnum.FormatDateDayMonth })));
        };
        this.formatToLocalWithDayName = () => {
            return this.moment.format(renderToStaticMarkup(React.createElement(Text, { name: TranslationEnum.FormatDateWithDayName })));
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
//# sourceMappingURL=ValidDate.js.map
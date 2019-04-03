import * as format from 'number-format.js';
import * as numeral from 'numeral';
import { AppError } from 'shared/errors/AppError';
import { InvalidPriceError } from 'shared/errors/InvalidPriceError';
import { PriceOperationWithDifferentCurrencyError } from 'shared/errors/PriceOperationWithDifferentCurrencyError';
import { ValidNumber } from 'shared/validObjects/ValidNumber';
import { ValidString } from 'shared/validObjects/ValidString';
const inputRegexp = new RegExp(/^([0-9]{1,3}\s?)*\s([A-Z]{3})$/);
const validate = (val) => {
    if (!inputRegexp.test(val)) {
        throw new AppError(val);
    }
};
export class ValidPrice extends ValidString {
    constructor(val) {
        try {
            super(val);
            validate(this.value);
            this.amm = new ValidNumber(numeral(this.value).value());
            this.curr = new ValidString(this.value.slice(-3));
        }
        catch (err) {
            if (!(err instanceof AppError)) {
                throw err;
            }
            throw new InvalidPriceError(err.message);
        }
    }
    get currency() {
        return this.curr.toString();
    }
    get amount() {
        return this.amm.value;
    }
    subtract(price) {
        this.checkCurrency(price);
        const amount = this.amount - price.amount;
        return new ValidPrice(amount.toString() + ' ' + this.currency);
    }
    isSame(price) {
        this.checkCurrency(price);
        return super.isSame(price);
    }
    isHigherThan(price) {
        this.checkCurrency(price);
        return this.amount > price.amount;
    }
    diffPercent(lowerPrice) {
        this.checkCurrency(lowerPrice);
        const diff = this.amount - lowerPrice.amount;
        return Math.round((diff / this.amount) * 100);
    }
    formatToLocale() {
        return format('### ###.', this.amount) + ' ' + this.currency;
    }
    toString() {
        return format('#.', this.amount) + ' ' + this.currency;
    }
    checkCurrency(price) {
        if (this.currency !== price.currency) {
            throw new PriceOperationWithDifferentCurrencyError(this, price);
        }
    }
}
//# sourceMappingURL=ValidPrice.js.map
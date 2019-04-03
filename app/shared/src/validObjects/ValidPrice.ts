import * as format from 'number-format.js'
import * as numeral from 'numeral'
import { AppError } from 'shared/errors/AppError'
import { InvalidPriceError } from 'shared/errors/InvalidPriceError'
import { PriceOperationWithDifferentCurrencyError } from 'shared/errors/PriceOperationWithDifferentCurrencyError'
import { ValidNumber } from 'shared/validObjects/ValidNumber'
import { ValidString } from 'shared/validObjects/ValidString'

const inputRegexp = new RegExp(/^([0-9]{1,3}\s?)*\s([A-Z]{3})$/)

const validate = (val: string): void => {
  if (!inputRegexp.test(val)) {
    throw new AppError(val)
  }
}

export class ValidPrice extends ValidString {
  private readonly amm: ValidNumber
  private readonly curr: ValidString

  // tslint:disable-next-line:no-any
  constructor(val: any) {
    try {
      super(val)
      validate(this.value)

      this.amm = new ValidNumber(numeral(this.value).value())
      this.curr = new ValidString(this.value.slice(-3))
    } catch (err) {
      if (!(err instanceof AppError)) {
        throw err
      }
      throw new InvalidPriceError(err.message)
    }
  }

  get currency(): string {
    return this.curr.toString()
  }

  get amount(): number {
    return this.amm.value
  }

  public subtract(price: ValidPrice): ValidPrice {
    this.checkCurrency(price)
    const amount = this.amount - price.amount

    return new ValidPrice(amount.toString() + ' ' + this.currency)
  }

  public isSame(price: ValidPrice): boolean {
    this.checkCurrency(price)

    return super.isSame(price)
  }

  public isHigherThan(price: ValidPrice): boolean {
    this.checkCurrency(price)

    return this.amount > price.amount
  }

  public diffPercent(lowerPrice: ValidPrice): number {
    this.checkCurrency(lowerPrice)
    const diff = this.amount - lowerPrice.amount

    return Math.round((diff / this.amount) * 100)
  }

  public formatToLocale() {
    return format('### ###.', this.amount) + ' ' + this.currency
  }

  public toString() {
    return format('#.', this.amount) + ' ' + this.currency
  }

  private checkCurrency(price: ValidPrice): void {
    if (this.currency !== price.currency) {
      throw new PriceOperationWithDifferentCurrencyError(this, price)
    }
  }
}

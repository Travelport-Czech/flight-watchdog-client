import { AppError } from 'src/errors/AppError'
import { ValidPrice } from 'src/validObjects/ValidPrice'

export class PriceOperationWithDifferentCurrencyError extends AppError {
  constructor(first: ValidPrice, second: ValidPrice) {
    super("Price operation with different currency '" + first.toString() + "' and '" + second.toString() + "'.")
  }
}

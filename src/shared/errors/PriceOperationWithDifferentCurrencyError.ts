import { AppError } from 'src/shared/errors/AppError'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'

export class PriceOperationWithDifferentCurrencyError extends AppError {
  constructor(first: ValidPrice, second: ValidPrice) {
    super("Price operation with different currency '" + first.toString() + "' and '" + second.toString() + "'.")
  }
}

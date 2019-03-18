import { AppError } from 'src/client/errors/AppError'
import { ValidPrice } from 'src/client/validObjects/ValidPrice'

export class PriceOperationWithDifferentCurrencyError extends AppError {
  constructor(first: ValidPrice, second: ValidPrice) {
    super("Price operation with different currency '" + first.toString() + "' and '" + second.toString() + "'.")
  }
}

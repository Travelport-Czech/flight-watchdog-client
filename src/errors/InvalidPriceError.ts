import { AppError } from 'src/errors/AppError'

export class InvalidPriceError extends AppError {
  constructor(value: string) {
    super("Invalid price '" + value + "'.")
  }
}

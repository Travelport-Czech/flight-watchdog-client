import { AppError } from 'src/shared/errors/AppError'

export class InvalidNumberError extends AppError {
  constructor(value: string) {
    super("Invalid number '" + value + "'.")
  }
}

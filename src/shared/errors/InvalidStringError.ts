import { AppError } from 'src/shared/errors/AppError'

export class InvalidStringError extends AppError {
  constructor(value: string) {
    super("Invalid string '" + value + "'.")
  }
}

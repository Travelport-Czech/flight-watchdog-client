import { AppError } from 'src/shared/errors/AppError'

export class InvalidDateError extends AppError {
  constructor(value: string) {
    super("Invalid date '" + value + "'.")
  }
}

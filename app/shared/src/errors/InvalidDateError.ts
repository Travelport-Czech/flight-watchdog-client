import { AppError } from '@shared/errors/AppError'

export class InvalidDateError extends AppError {
  constructor(value: string) {
    super("Invalid date '" + value + "'.")
  }
}

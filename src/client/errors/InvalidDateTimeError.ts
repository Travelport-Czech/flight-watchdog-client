import { AppError } from 'src/client/errors/AppError'

export class InvalidDateTimeError extends AppError {
  constructor(value: string) {
    super("Invalid date time '" + value + "'.")
  }
}

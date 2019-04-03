import { AppError } from 'shared/errors/AppError'

export class InvalidUrlError extends AppError {
  constructor(value: string) {
    super("Invalid url '" + value + "'.")
  }
}

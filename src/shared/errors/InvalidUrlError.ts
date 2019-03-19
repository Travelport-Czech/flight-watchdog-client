import { AppError } from 'src/shared/errors/AppError'

export class InvalidUrlError extends AppError {
  constructor(value: string) {
    super("Invalid url '" + value + "'.")
  }
}

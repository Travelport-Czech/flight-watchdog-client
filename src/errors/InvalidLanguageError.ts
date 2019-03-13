import { AppError } from 'src/errors/AppError'

export class InvalidLanguageError extends AppError {
  constructor(value: string) {
    super("Invalid language '" + value + "'.")
  }
}

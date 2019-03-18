import { AppError } from 'src/client/errors/AppError'

export class InvalidStringError extends AppError {
  constructor(value: string) {
    super("Invalid string '" + value + "'.")
  }
}

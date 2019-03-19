import { AppError } from 'src/shared/errors/AppError'

export class InvalidEmailError extends AppError {
  constructor(value: string) {
    super("Invalid email '" + value + "'.")
  }
}

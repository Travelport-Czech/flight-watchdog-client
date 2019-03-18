import { AppError } from 'src/client/errors/AppError'

export class InvalidLocationError extends AppError {
  constructor(value: string) {
    super("Invalid location '" + value + "'.")
  }
}

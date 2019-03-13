import { AppError } from 'src/errors/AppError'

export class InvalidJsonError extends AppError {
  constructor() {
    super('Invalid JSON.')
  }
}

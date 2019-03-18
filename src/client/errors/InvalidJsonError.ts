import { AppError } from 'src/client/errors/AppError'

export class InvalidJsonError extends AppError {
  constructor() {
    super('Invalid JSON.')
  }
}

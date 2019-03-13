import { AppError } from 'src/errors/AppError'

export class InvalidWatcherIdError extends AppError {
  constructor(value: string) {
    super("Invalid watcherId '" + value + "'.")
  }
}

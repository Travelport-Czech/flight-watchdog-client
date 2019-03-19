import { AppError } from 'src/shared/errors/AppError'

export class InvalidWatcherIdError extends AppError {
  constructor(value: string) {
    super("Invalid watcherId '" + value + "'.")
  }
}

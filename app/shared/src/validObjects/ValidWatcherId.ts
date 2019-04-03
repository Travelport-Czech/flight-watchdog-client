import { AppError } from 'shared/errors/AppError'
import { InvalidWatcherIdError } from 'shared/errors/InvalidWatcherIdError'
import { ValidString } from 'shared/validObjects/ValidString'

export class ValidWatcherId extends ValidString {
  // tslint:disable-next-line:no-any
  constructor(val: any) {
    try {
      super(val)
    } catch (err) {
      if (!(err instanceof AppError)) {
        throw err
      }
      throw new InvalidWatcherIdError(err.message)
    }
  }
}

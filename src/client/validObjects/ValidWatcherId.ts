import { AppError } from 'src/client/errors/AppError'
import { InvalidWatcherIdError } from 'src/client/errors/InvalidWatcherIdError'
import { ValidString } from 'src/client/validObjects/ValidString'

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

import { UnknownNestedObject } from '@client/types/UnknownNestedObject'
import { InvalidJsonError } from '@shared/errors/InvalidJsonError'

export const parseJson = (data: string | undefined | null): UnknownNestedObject => {
  if (!data) {
    throw new InvalidJsonError()
  }
  try {
    return <UnknownNestedObject>JSON.parse(data)
  } catch (e) {
    throw new InvalidJsonError()
  }
}

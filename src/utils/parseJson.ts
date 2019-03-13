import { InvalidJsonError } from 'src/errors/InvalidJsonError'
import { UnknownNestedObject } from 'src/types/UnknownNestedObject'

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

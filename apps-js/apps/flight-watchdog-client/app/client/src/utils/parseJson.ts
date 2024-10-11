import { InvalidJsonError } from '@shared/errors/InvalidJsonError'

export const parseJson = (data: string | undefined | null): unknown => {
    if (!data) {
        throw new InvalidJsonError()
    }
    try {
        return JSON.parse(data)
    } catch (e) {
        throw new InvalidJsonError()
    }
}

import { AppError } from '@shared/errors/AppError'

export class InvalidJsonError extends AppError {
    constructor() {
        super('Invalid JSON.')
    }
}

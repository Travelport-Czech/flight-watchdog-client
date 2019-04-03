import { AppError } from 'shared/errors/AppError';
import { InvalidLanguageError } from 'shared/errors/InvalidLanguageError';
import { SupportedLanguageEnum } from 'shared/translation/SupportedLanguageEnum';
import { ValidString } from 'shared/validObjects/ValidString';
const validate = (lang) => {
    if (!Object.values(SupportedLanguageEnum).includes(lang)) {
        throw new InvalidLanguageError(lang);
    }
};
export class ValidLanguage extends ValidString {
    constructor(val) {
        try {
            super(val);
        }
        catch (err) {
            if (!(err instanceof AppError)) {
                throw err;
            }
            throw new InvalidLanguageError(err.message);
        }
        validate(this.value);
    }
}
//# sourceMappingURL=ValidLanguage.js.map
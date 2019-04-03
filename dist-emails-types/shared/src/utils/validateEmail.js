import { validate } from 'email-validator';
export const validateEmail = (email) => {
    if (!email) {
        return false;
    }
    if (!validate(email)) {
        return false;
    }
    if (email.includes('+')) {
        return false;
    }
    return true;
};
//# sourceMappingURL=validateEmail.js.map
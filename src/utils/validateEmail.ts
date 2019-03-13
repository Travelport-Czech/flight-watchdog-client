import { validate } from 'email-validator'

export const validateEmail = (email: string | undefined): boolean => {
  if (!email) {
    return false
  }

  if (!validate(email)) {
    return false
  }

  if (email.includes('+')) {
    return false
  }

  return true
}

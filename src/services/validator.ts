import { HttpErrors } from '@loopback/rest'
import { Credentials } from '../repositories/user.repository'

export function validateCredentials(credentials: Credentials) {

  // Validate Password Length
  if (!credentials.password || credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity('password-must-be-minimum-8-characters')
  }

}

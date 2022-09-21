import { HttpErrors } from '@loopback/rest'
import { Credentials } from '../repositories/user.repository'

export function validateCredentials(credentials: Credentials) {
  // Validate Email
  if (!isemail.validate(credentials.email)) {
    throw new HttpErrors.UnprocessableEntity('invalid-email')
  }

  // Validate Password Length
  if (!credentials.password || credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity('password-must-be-minimum-8-characters')
  }

  // Validate Platform
  if (
    !credentials.platform &&
    credentials.platform !== PlatformEnum.EXTRANET &&
    credentials.platform !== PlatformEnum.VSM &&
    credentials.platform !== PlatformEnum.WEBSITE
  ) {
    throw new HttpErrors.UnprocessableEntity('platform-must-be-one-of-vsm-extranet-or-website')
  }
}

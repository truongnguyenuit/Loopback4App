import { UserWithPassword } from '../models'
import { User } from '../models/user.model'
export class MyUserService {
  constructor() {}

  async createUser(userWithPassword: UserWithPassword): Promise<User> {
    //* ensure a valid email value and password value
    validateCredentials(pick(userWithPassword, ['email', 'password', 'platform']))
    //* encrypt the password
    const password = await this.passwordHasher.hashPassword(userWithPassword.password)
    try {
      //* create the new user
      const savedUser = await this.userRepository.create(omit(userWithPassword, 'password'))

      //* set the password
      await this.userRepository.userCredentials(savedUser.id).create({ password })

      return savedUser
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('email')) {
        throw new HttpErrors.Conflict('email-value-is-already-taken')
      } else {
        throw error
      }
    }
  }
}

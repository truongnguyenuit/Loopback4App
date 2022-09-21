import { UserRepository } from '../repositories';
import { User } from '../models';
import { HttpErrors } from '@loopback/rest';
import { Credentials }from '../repositories/user.repository'
export async function validateCredentials( credential: Credentials, userRepository: UserRepository) {

  const findUser = await userRepository.findOne({
    where: {
      email: credential.email
    }
  });

  if (findUser !== null) {
    throw new HttpErrors.UnprocessableEntity('this email already exist')
  }
}


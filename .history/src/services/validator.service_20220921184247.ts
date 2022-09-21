import { UserRepository } from '../repositories';
import { User } from '../models';
export async function validateCredentials( user: User, userRepository: UserRepository) {
  const findUser = await userRepository.
}


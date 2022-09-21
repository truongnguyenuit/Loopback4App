import {authenticate, TokenService} from '@loopback/authentication';
import {
  Credentials,
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  post,
  requestBody,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import { validateCredentials } from '../services/validator.service';
import { User, UserCredential, UserWithPassword } from '../models';
import { UserRepository } from '../repositories';
import { MyUserService } from '../services/user.service'
export class UserManagementController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  // @post('/auth/sign-up', {
  //   responses: {
  //     '200': {
  //       description: 'Sign up a new user',
  //       content: { 'application/json': { schema: getModelSchemaRef(User) } }
  //     }
  //   }
  // })
  // async signUp(
    //@requestBody ({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(UserWithPassword, {
  //           title: 'NewUser',

  //         })
  //       }
  //     }
  //   })
  //   newUserRequest: UserWithPassword
  // ): Promise<User> {

  //    return this.userService.createUser(newUserRequest)
  // }

  @post('/sign-up', {
    responses: {
      '200': {
        description: 'Sign up',
        content: {
          schema: getModelSchemaRef(User)
        },
      },
    },
  })
  async signUp(@requestBody() userData: User) {
    await validateCredentials(userData, this.userRepository);
    userData.password = await this.hasher.hashPassword(userData.password);
    const savedUser = await this.userRepository.create(userData);
    return _.omit(savedUser, 'password');
  }
}

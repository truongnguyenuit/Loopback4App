import {authenticate, TokenService} from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
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
import { User, UserCredential } from '../models';
import { UserRepository } from '../repositories';
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
  

  // @post('/sign-up', {
  //   responses: {
  //     '200': {
  //       description: 'Sign up',
  //       content: {
  //         schema: getModelSchemaRef(User)
  //       },
  //     },
  //   },
  // })
  // async signUp(@requestBody() userData: User) {
  //   await validateCredentials(userData, this.userRepository);
  //   userData.password = await this.hasher.hashPassword(userData.password);
  //   const savedUser = await this.userRepository.create(userData);
  //   return _.omit(savedUser, 'password');
  // }
}

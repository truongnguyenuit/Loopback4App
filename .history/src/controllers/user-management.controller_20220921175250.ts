import {authenticate, TokenService} from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  UserRepository,
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
import 
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
  async signUp(@requestBody() userData: User) {
    await validateCredentials
    const password = await hash(newUserRequest.password, await genSalt());
    const savedUser = await this.userRepository.create(_.omit(newUserRequest, 'password'),);

    await this.userRepository.userCredentials(savedUser.id).create({password});

    // return savedUser;
    return this.userService.createUser(newUserRequest)
  }
}

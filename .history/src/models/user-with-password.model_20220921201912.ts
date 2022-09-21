import {model, property} from '@loopback/repository';
import {User} from '.';

@model()
export class UserWithPassword extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;

}


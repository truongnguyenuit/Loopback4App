import {UserWithRelations} from '@loopback/authentication-jwt';
import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class UserCredential extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;


  
}

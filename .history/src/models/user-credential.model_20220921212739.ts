import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class UserCredential extends Entity {
  @property({
    type: 'string',
    id: true,
    mongodb: { dataType: 'ObjectID' },
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  passwordUser: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<UserCredential>) {
    super(data);
  }
}

export interface UserCredentialRelations {
  // describe navigational properties here
}

export type UserCredentialWithRelations = UserCredential & UserCredentialRelations;

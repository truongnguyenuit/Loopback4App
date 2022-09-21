import {model, property} from '@loopback/repository';
import {User} from '.';

@model()
export class UserWithPassword extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserWithPassword>) {
    super(data);
  }
}

export interface UserWithPasswordRelations {
  // describe navigational properties here
}

export type UserWithPasswordWithRelations = UserWithPassword & UserWithPasswordRelations;

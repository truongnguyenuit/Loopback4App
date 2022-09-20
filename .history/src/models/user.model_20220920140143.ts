import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: Object
    }
    required: true,
  })
  status: string;

  @property({
    type: 'boolean',
    required: true,
    default: false
  })
  isDeleted: boolean;

  @property({
    type: 'date',
    required: true,
    default: () => new Date()
  })
  createAt?: Date;

  @property({
    type: 'date',
    required: true,
    default: () => new Date()
  })
  updateAt?: Date;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

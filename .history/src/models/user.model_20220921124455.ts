import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import { UserEnum } from '../enums/user';
import {Task} from './task.model';
import {ProjectUser} from './project-user.model';
import {UserCredential} from './user-credential.model';

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
    default: ''
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
      enum: Object.values(UserEnum)
    },
    required: true,
  })
  status: UserEnum;

  @property({
    type: 'boolean',
    required: true,
    default: false
  })
  isDeleted: boolean;

  @property({
    type: 'date',
    default: () => new Date()
  })
  createAt?: Date;

  @property({
    type: 'date',
    default: () => new Date()
  })
  updateAt?: Date;

  @hasMany(() => Task)
  tasks: Task[];

  @hasMany(() => ProjectUser)
  projectUsers: ProjectUser[];

  @hasOne(() => UserCredential)
  userCredential: UserCredential;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

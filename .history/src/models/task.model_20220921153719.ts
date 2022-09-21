import {Entity, model, property, belongsTo} from '@loopback/repository';
import { StatusEnum } from '../enums/user';
import {Project, ProjectWithRelations} from './project.model';
import {User} from './user.model';
import {ProjectUser, ProjectUserWithRelations} from './project-user.model';
import {UserWithRelations} from '@loopback/authentication-jwt';

@model()
export class Task extends Entity {
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
  description: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(StatusEnum)
    },
    required: true,
  })
  status: StatusEnum;

  @property({
    type: 'object',

  })
  linkedTaskId?: object;

  @property({
    type: 'boolean',
    required: true,
    default: false
  })
  idDeleted: boolean;

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

  @belongsTo(() => Project)
  projectId: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => ProjectUser)
  projectUserId: string;

  @belongsTo(() => Task)
  taskId: string;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  project?: ProjectWithRelations,
  user?: UserWithRelations,
  projectUser?: ProjectUserWithRelations
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;

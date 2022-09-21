import {UserWithRelations} from '@loopback/authentication-jwt';
import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import { UserEnum, RoleEnum  } from '../enums/user';
import {Project, ProjectWithRelations} from './project.model';
import {Task, TaskWithRelations} from './task.model';
import {User} from './user.model';

@model()
export class ProjectUser extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(RoleEnum)
    },
    required: true,
  })
  role: RoleEnum;

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
  })
  isDeleted: boolean;

  @property({
    type: 'date',
    required: true,
    default: () => new Date()
  })
  createAt: Date;

  @property({
    type: 'date',
    required: true,
    default: () => new Date()
  })
  updateAt: Date;

  @belongsTo(() => Project)
  projectId: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<ProjectUser>) {
    super(data);
  }
}

export interface ProjectUserRelations {
  project?: ProjectWithRelations,
  tasks: TaskWithRelations[],
  user?: UserWithRelations
}

export type ProjectUserWithRelations = ProjectUser & ProjectUserRelations;

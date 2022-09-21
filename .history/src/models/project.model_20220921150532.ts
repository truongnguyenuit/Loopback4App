import {Entity, model, property, hasMany} from '@loopback/repository';
import { StatusEnum } from '../enums/user';
import {Task, TaskWithRelations} from './task.model';
import {ProjectUser} from './project-user.model';

@model()
export class Project extends Entity {
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
  title: string;

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
    type: 'boolean',
    required: true,
    default: false,
  })
  idDeleted: boolean;

  @property({
    type: 'date',
    required: true,
    default: () => new Date()
  })
  createdAt?: Date;

  @property({
    type: 'date',
    required: true,
    default: () => new Date()
  })
  updateAt?: Date;

  @hasMany(() => Task)
  tasks: Task[];

  @hasMany(() => ProjectUser)
  projectUsers: ProjectUser[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  tasks?: TaskWithRelations[],
  projectUsers?: ProjectUsers
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;

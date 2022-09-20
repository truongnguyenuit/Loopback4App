import {Entity, model, property} from '@loopback/repository';
import { UserEnum, RoleEnum  } from '../enums/user';
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
  updateAt: string;


  constructor(data?: Partial<ProjectUser>) {
    super(data);
  }
}

export interface ProjectUserRelations {
  // describe navigational properties here
}

export type ProjectUserWithRelations = ProjectUser & ProjectUserRelations;

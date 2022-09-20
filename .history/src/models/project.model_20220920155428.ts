import {Entity, model, property} from '@loopback/repository';
import { StatusEnum } from '../enums/user';
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
  createdAt: string;

  @property({
    type: 'date',
    required: true,
    default: () => new Date()
  })
  updateAt: string;


  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;

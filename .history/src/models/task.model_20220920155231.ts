import {Entity, model, property} from '@loopback/repository';
import { StatusEnum } from '../enums/user';
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
    default: () => new Date()

  })
  createAt?: Date;

  @property({
    type: 'date',
    required: true,
    default: () => new Date()
  })
  updateAt?: Date;


  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;

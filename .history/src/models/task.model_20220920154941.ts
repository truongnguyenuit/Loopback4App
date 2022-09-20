import {Entity, model, property} from '@loopback/repository';

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
    required: true,
  })
  status: string;

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

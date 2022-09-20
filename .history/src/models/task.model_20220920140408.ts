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
    required: true,
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
  })
  idDeleted: boolean;

  @property({
    type: 'date',
    required: true,
  })
  createAt?: string;

  @property({
    type: 'date',
    required: true,
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

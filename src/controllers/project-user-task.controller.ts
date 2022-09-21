import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ProjectUser,
  Task,
} from '../models';
import {ProjectUserRepository} from '../repositories';

export class ProjectUserTaskController {
  constructor(
    @repository(ProjectUserRepository) protected projectUserRepository: ProjectUserRepository,
  ) { }

  @get('/project-users/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of ProjectUser has many Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Task)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Task>,
  ): Promise<Task[]> {
    return this.projectUserRepository.tasks(id).find(filter);
  }

  @post('/project-users/{id}/tasks', {
    responses: {
      '200': {
        description: 'ProjectUser model instance',
        content: {'application/json': {schema: getModelSchemaRef(Task)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProjectUser.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {
            title: 'NewTaskInProjectUser',
            exclude: ['id'],
            optional: ['projectUserId']
          }),
        },
      },
    }) task: Omit<Task, 'id'>,
  ): Promise<Task> {
    return this.projectUserRepository.tasks(id).create(task);
  }

  @patch('/project-users/{id}/tasks', {
    responses: {
      '200': {
        description: 'ProjectUser.Task PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {partial: true}),
        },
      },
    })
    task: Partial<Task>,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.projectUserRepository.tasks(id).patch(task, where);
  }

  @del('/project-users/{id}/tasks', {
    responses: {
      '200': {
        description: 'ProjectUser.Task DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.projectUserRepository.tasks(id).delete(where);
  }
}

import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Task,
  ProjectUser,
} from '../models';
import {TaskRepository} from '../repositories';

export class TaskProjectUserController {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
  ) { }

  @get('/tasks/{id}/project-user', {
    responses: {
      '200': {
        description: 'ProjectUser belonging to Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProjectUser)},
          },
        },
      },
    },
  })
  async getProjectUser(
    @param.path.string('id') id: typeof Task.prototype.id,
  ): Promise<ProjectUser> {
    return this.taskRepository.projectUser(id);
  }
}

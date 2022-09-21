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
  Task,
} from '../models';
import {TaskRepository} from '../repositories';

export class TaskTaskController {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
  ) { }

  @get('/tasks/{id}/task', {
    responses: {
      '200': {
        description: 'Task belonging to Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Task)},
          },
        },
      },
    },
  })
  async getTask(
    @param.path.string('id') id: typeof Task.prototype.id,
  ): Promise<Task> {
    return this.taskRepository.task(id);
  }
}

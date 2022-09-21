import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProjectUser,
  Project,
} from '../models';
import {ProjectUserRepository} from '../repositories';

export class ProjectUserProjectController {
  constructor(
    @repository(ProjectUserRepository)
    public projectUserRepository: ProjectUserRepository,
  ) { }

  @get('/project-users/{id}/project', {
    responses: {
      '200': {
        description: 'Project belonging to ProjectUser',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async getProject(
    @param.path.string('id') id: typeof ProjectUser.prototype.id,
  ): Promise<Project> {
    return this.projectUserRepository.project(id);
  }
}

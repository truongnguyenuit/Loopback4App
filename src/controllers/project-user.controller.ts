import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProjectUser} from '../models';
import {ProjectUserRepository} from '../repositories';

export class ProjectUserController {
  constructor(
    @repository(ProjectUserRepository)
    public projectUserRepository : ProjectUserRepository,
  ) {}

  @post('/project-users')
  @response(200, {
    description: 'ProjectUser model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProjectUser)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectUser, {
            title: 'NewProjectUser',
            exclude: ['id'],
          }),
        },
      },
    })
    projectUser: Omit<ProjectUser, 'id'>,
  ): Promise<ProjectUser> {
    return this.projectUserRepository.create(projectUser);
  }

  @get('/project-users/count')
  @response(200, {
    description: 'ProjectUser model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProjectUser) where?: Where<ProjectUser>,
  ): Promise<Count> {
    return this.projectUserRepository.count(where);
  }

  @get('/project-users')
  @response(200, {
    description: 'Array of ProjectUser model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProjectUser, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProjectUser) filter?: Filter<ProjectUser>,
  ): Promise<ProjectUser[]> {
    return this.projectUserRepository.find(filter);
  }

  @patch('/project-users')
  @response(200, {
    description: 'ProjectUser PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectUser, {partial: true}),
        },
      },
    })
    projectUser: ProjectUser,
    @param.where(ProjectUser) where?: Where<ProjectUser>,
  ): Promise<Count> {
    return this.projectUserRepository.updateAll(projectUser, where);
  }

  @get('/project-users/{id}')
  @response(200, {
    description: 'ProjectUser model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProjectUser, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProjectUser, {exclude: 'where'}) filter?: FilterExcludingWhere<ProjectUser>
  ): Promise<ProjectUser> {
    return this.projectUserRepository.findById(id, filter);
  }

  @patch('/project-users/{id}')
  @response(204, {
    description: 'ProjectUser PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectUser, {partial: true}),
        },
      },
    })
    projectUser: ProjectUser,
  ): Promise<void> {
    await this.projectUserRepository.updateById(id, projectUser);
  }

  @put('/project-users/{id}')
  @response(204, {
    description: 'ProjectUser PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() projectUser: ProjectUser,
  ): Promise<void> {
    await this.projectUserRepository.replaceById(id, projectUser);
  }

  @del('/project-users/{id}')
  @response(204, {
    description: 'ProjectUser DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.projectUserRepository.deleteById(id);
  }
}

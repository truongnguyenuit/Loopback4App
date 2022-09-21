import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbloopbackDataSource} from '../datasources';
import {ProjectUser, ProjectUserRelations, Project, Task, User} from '../models';
import {ProjectRepository} from './project.repository';
import {TaskRepository} from './task.repository';
import {UserRepository} from './user.repository';

export class ProjectUserRepository extends DefaultCrudRepository<
  ProjectUser,
  typeof ProjectUser.prototype.id,
  ProjectUserRelations
> {

  public readonly project: BelongsToAccessor<Project, typeof ProjectUser.prototype.id>;

  public readonly tasks: HasManyRepositoryFactory<Task, typeof ProjectUser.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof ProjectUser.prototype.id>;

  constructor(
    @inject('datasources.mongodbloopback') dataSource: MongodbloopbackDataSource, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(ProjectUser, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', taskRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
    this.project = this.createBelongsToAccessorFor('project', projectRepositoryGetter,);
    this.registerInclusionResolver('project', this.project.inclusionResolver);
  }
}

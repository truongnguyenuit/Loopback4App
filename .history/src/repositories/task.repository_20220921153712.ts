import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbloopbackDataSource} from '../datasources';
import {Task, TaskRelations, Project, User, ProjectUser} from '../models';
import {ProjectRepository} from './project.repository';
import {UserRepository} from './user.repository';
import {ProjectUserRepository} from './project-user.repository';

export class TaskRepository extends DefaultCrudRepository<
  Task,
  typeof Task.prototype.id,
  TaskRelations
> {

  public readonly project: BelongsToAccessor<Project, typeof Task.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Task.prototype.id>;

  public readonly projectUser: BelongsToAccessor<ProjectUser, typeof Task.prototype.id>;

  public readonly task: BelongsToAccessor<Task, typeof Task.prototype.id>;

  constructor(
    @inject('datasources.mongodbloopback') dataSource: MongodbloopbackDataSource, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ProjectUserRepository') protected projectUserRepositoryGetter: Getter<ProjectUserRepository>, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>,
  ) {
    super(Task, dataSource);
    this.task = this.createBelongsToAccessorFor('task', taskRepositoryGetter,);
    this.registerInclusionResolver('task', this.task.inclusionResolver);
    this.projectUser = this.createBelongsToAccessorFor('projectUser', projectUserRepositoryGetter,);
    this.registerInclusionResolver('projectUser', this.projectUser.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.project = this.createBelongsToAccessorFor('project', projectRepositoryGetter,);
    this.registerInclusionResolver('project', this.project.inclusionResolver);
  }
}

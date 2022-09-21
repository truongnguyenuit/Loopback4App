import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbloopbackDataSource} from '../datasources';
import {User, UserRelations, Task, ProjectUser, UserCredential} from '../models';
import {TaskRepository} from './task.repository';
import {ProjectUserRepository} from './project-user.repository';
import {UserCredentialRepository} from './user-credential.repository';

export type Credential
export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly tasks: HasManyRepositoryFactory<Task, typeof User.prototype.id>;

  public readonly projectUsers: HasManyRepositoryFactory<ProjectUser, typeof User.prototype.id>;

  public readonly userCredential: HasOneRepositoryFactory<UserCredential, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodbloopback') dataSource: MongodbloopbackDataSource, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>, @repository.getter('ProjectUserRepository') protected projectUserRepositoryGetter: Getter<ProjectUserRepository>, @repository.getter('UserCredentialRepository') protected userCredentialRepositoryGetter: Getter<UserCredentialRepository>,
  ) {
    super(User, dataSource);

    this.userCredential = this.createHasOneRepositoryFactoryFor('userCredential', userCredentialRepositoryGetter);
    this.registerInclusionResolver('userCredential', this.userCredential.inclusionResolver);
    this.projectUsers = this.createHasManyRepositoryFactoryFor('projectUsers', projectUserRepositoryGetter,);
    this.registerInclusionResolver('projectUsers', this.projectUsers.inclusionResolver);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', taskRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}

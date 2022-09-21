import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbloopbackDataSource} from '../datasources';
import {UserCredential, UserCredentialRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class UserCredentialRepository extends DefaultCrudRepository<
  UserCredential,
  typeof UserCredential.prototype.id,
  UserCredentialRelations
> {

  public readonly user: BelongsToAccessor<User, typeof UserCredential.prototype.id>;

  constructor(
    @inject('datasources.mongodbloopback') dataSource: MongodbloopbackDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserCredential, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}

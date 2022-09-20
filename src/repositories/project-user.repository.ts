import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbloopbackDataSource} from '../datasources';
import {ProjectUser, ProjectUserRelations} from '../models';

export class ProjectUserRepository extends DefaultCrudRepository<
  ProjectUser,
  typeof ProjectUser.prototype.id,
  ProjectUserRelations
> {
  constructor(
    @inject('datasources.mongodbloopback') dataSource: MongodbloopbackDataSource,
  ) {
    super(ProjectUser, dataSource);
  }
}

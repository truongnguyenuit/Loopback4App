import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodbloopback',
  connector: 'mongodb',
  url: 'mongodb+srv://vrttankzz:0918972561@loopback4db.vba6yzx.mongodb.net/?retryWrites=true&w=majority',
  host: 'localhost',
  port: 27017,
  user: 'vrttankzz',
  password: '0918972561',
  database: 'lb4database',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbloopbackDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodbloopback';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodbloopback', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

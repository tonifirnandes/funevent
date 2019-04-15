import {DefaultCrudRepository} from '@loopback/repository';
import {Events} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EventsRepository extends DefaultCrudRepository<
  Events,
  typeof Events.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Events, dataSource);
  }
}

import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Events} from '../models';
import {EventsRepository} from '../repositories';

export class EventsController {
  constructor(
    @repository(EventsRepository)
    public eventsRepository : EventsRepository,
  ) {}

  @post('/events', {
    responses: {
      '200': {
        description: 'Events model instance',
        content: {'application/json': {schema: {'x-ts-type': Events}}},
      },
    },
  })
  async create(@requestBody() events: Events): Promise<Events> {
    return await this.eventsRepository.create(events);
  }

  @get('/events/count', {
    responses: {
      '200': {
        description: 'Events model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Events)) where?: Where,
  ): Promise<Count> {
    return await this.eventsRepository.count(where);
  }

  @get('/events', {
    responses: {
      '200': {
        description: 'Array of Events model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Events}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Events)) filter?: Filter,
  ): Promise<Events[]> {
    return await this.eventsRepository.find(filter);
  }

  @patch('/events', {
    responses: {
      '200': {
        description: 'Events PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() events: Events,
    @param.query.object('where', getWhereSchemaFor(Events)) where?: Where,
  ): Promise<Count> {
    return await this.eventsRepository.updateAll(events, where);
  }

  @get('/events/{id}', {
    responses: {
      '200': {
        description: 'Events model instance',
        content: {'application/json': {schema: {'x-ts-type': Events}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Events> {
    return await this.eventsRepository.findById(id);
  }

  @patch('/events/{id}', {
    responses: {
      '204': {
        description: 'Events PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() events: Events,
  ): Promise<void> {
    await this.eventsRepository.updateById(id, events);
  }

  @put('/events/{id}', {
    responses: {
      '204': {
        description: 'Events PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() events: Events,
  ): Promise<void> {
    await this.eventsRepository.replaceById(id, events);
  }

  @del('/events/{id}', {
    responses: {
      '204': {
        description: 'Events DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.eventsRepository.deleteById(id);
  }
}

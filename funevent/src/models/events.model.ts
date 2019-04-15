import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Events extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: false,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    default: 'EVENT_NAME',
  })
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Events>) {
    super(data);
  }
}

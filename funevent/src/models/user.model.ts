import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'number',
    required: true,
    default: 0,
    id: true,
  })
  id: number;
  @property({
    type: 'string',
    required: true,
    default: 'USER_NAME',
  })
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

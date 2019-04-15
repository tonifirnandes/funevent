import {get} from '@loopback/rest';
export class TestController {
  @get('/test')
  test(): string {
    return 'This is just a test';
  }
}

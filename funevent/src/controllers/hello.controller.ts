import {get} from '@loopback/rest';
export class HelloController {
  @get('/hello')
  hello(): string {
    return 'Welcome oke lah to UMN Startup Programs';
  }
}

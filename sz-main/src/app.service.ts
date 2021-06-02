import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('PDF_SERVICE') private client: ClientProxy,
  ) {}
  getHello(): string {
    const pattern = { cmd: 'hello' };
    this.client.send(pattern, {}).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Error:', err)
    });
    return 'Hello World!';
  }
}

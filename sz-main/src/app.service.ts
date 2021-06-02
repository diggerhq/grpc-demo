import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

//TODO import the actual service instead
interface PdfService {
  hello({}): Observable<any>
} 

@Injectable()
export class AppService {

  private pdfService: PdfService;

  constructor(
    @Inject('PDF_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.pdfService = this.client.getService<PdfService>('PdfService');
  }

  getHello(): string {
    const pattern = { cmd: 'hello' };
    this.pdfService.hello({}).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Error:', err)
    });
    return 'Hello World!';
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

const pdfServiceUrl = process.env.PDF_SVC_URL || 'localhost:5000';
console.log('PDF Service: ', pdfServiceUrl);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PDF_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'pdf',
          protoPath: join(__dirname, 'hello.proto'),
          url: pdfServiceUrl
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

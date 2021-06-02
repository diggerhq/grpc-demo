import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'pdf',
        protoPath: join(__dirname, 'hello.proto'),
      },
    },
  );
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();

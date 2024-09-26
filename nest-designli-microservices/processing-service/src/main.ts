import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('processing-service');
  const app = await NestFactory.create(AppModule);
  app.listen(3000); // Puerto http para los clientes

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4000, // Puerto donde este servicio escuchará mensajes
    },
  });

  await app.startAllMicroservices();
  logger.debug('Processing service is running at port 4000');
  logger.debug('http is running at port 3000');
}
bootstrap();

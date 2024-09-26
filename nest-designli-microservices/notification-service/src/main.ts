import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('notification-service');
  const app = await NestFactory.create(AppModule);

  // Iniciar WebSocket Gateway
  app.listen(3001); // Puerto del WebSocket para los clientes

  // Iniciar microservicio TCP para recibir eventos
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4001, // Puerto donde este servicio escuchará mensajes
    },
  });

  await app.startAllMicroservices();
  logger.debug('Notification service is running at port 4001');
  logger.debug('websocket is running at port 3001');
}
bootstrap();

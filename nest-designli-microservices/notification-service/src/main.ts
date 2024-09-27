import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const host = process.env.host || '0.0.0.0';
  const port = +process.env.PORT || 3001;
  const portMicroservice = +process.env.PORTMICROSERVICE || 4001;

  const logger = new Logger('notification-service');
  const app = await NestFactory.create(AppModule);

  // Iniciar WebSocket Gateway
  app.listen(port); // Puerto del WebSocket para los clientes

  // Iniciar microservicio TCP para recibir eventos
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: host,
      port: portMicroservice, // Puerto donde este servicio escuchará mensajes
    },
  });

  await app.startAllMicroservices();
  logger.debug('Notification microservice is running at port ' + portMicroservice);
  logger.debug(`websocket is running at port ${port}`);

}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const basePath = process.env.basePath || 'api/v1';
  const host = process.env.host || '0.0.0.0';
  const port = +process.env.PORT || 3010;
  const portMicroservice = +process.env.PORTMICROSERVICE || 4000;
  const logger = new Logger('processing-service');
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API GATEWAY')
    .setDescription('The API GATEWAY for the application PROCESSING-SERVICE')
    .setVersion('1.0')
    .addTag('API GATEWAY')
    .addServer(basePath)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.setGlobalPrefix(basePath);
  app.listen(port, host); // Puerto http para los clientes

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: host,
      port: portMicroservice, // Puerto donde este servicio escuchará mensajes
    },
  });

  await app.startAllMicroservices();
  logger.debug('Processing microservice is running at port at' + portMicroservice);
  logger.debug(`Application is running on: http://${host}:${port}/${basePath}`);
  logger.debug(`Swagger is running on: http://${host}:${port}/docs`);
}
bootstrap();

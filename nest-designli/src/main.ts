import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ErrorInterceptor } from './common/interceptors/error.interceptor'; // Cambia la ruta si es necesario

async function bootstrap() {
  const logger = new Logger('ApiGateway');
  const basePath = process.env.basePath || 'api/v1';
  const host = process.env.host || '0.0.0.0';
  const port = +process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*'
  })

  const config = new DocumentBuilder()
    .setTitle('Nest Designli-test')
    .setDescription('Two exercises described in the technical test')
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
  app.useGlobalInterceptors(new ErrorInterceptor());
  await app.listen(port, host);
  logger.log(`Application is running on: http://${host}:${port}/${basePath}`);
  logger.log(`Swagger is running on: http://${host}:${port}/docs`);
}
bootstrap();

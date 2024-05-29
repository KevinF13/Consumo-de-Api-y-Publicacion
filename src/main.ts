import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para todos los orígenes
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API CAPSTONE DOCUMENTATION')
    .setDescription('APIS PARA USAR')
    .setVersion('1.0')
    .addTag('Persona')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();

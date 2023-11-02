import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap')

  //* Implementamos nuestros cors
  app.enableCors();

  //* Prefijos de nuestras rutas
  app.setGlobalPrefix('api');

  //* Validaciones de nuestro pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
   );

   //* finguracion para la documentación de nuestros end points
   const config = new DocumentBuilder()
   .setTitle('Teslo RESTFul API')
   .setDescription('Teslo Shop endpoints')
   .setVersion('1.0')
   .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);

   // * Llamamos el listen para que nuestro servidor corra en el puerto especificado 
  await app.listen(process.env.PORT);
  logger.log(`App running on port: ${process.env.PORT}`);
}
bootstrap();

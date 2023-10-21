import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Prefijos de nuestras rutas
  app.setGlobalPrefix('api');

  //* Validaciones de nuestro pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
   );

   // * Llamamos el listen para que nuestro servidor corra en el puerto especificado 
  await app.listen(process.env.PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))
  app.enableCors();
  await app.listen(configService.get<number>('port') ? configService.get<number>('port') : 3000);
  console.log(`App is listening on port ${configService.get<number>('port')}`);
}

bootstrap();

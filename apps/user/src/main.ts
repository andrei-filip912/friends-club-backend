import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.enableCors({
    origin: 'https://friends-club.dev:3000',
    // credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(8000);
}
bootstrap();

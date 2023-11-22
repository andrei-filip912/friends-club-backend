import { NestFactory } from '@nestjs/core';
import { PostModule } from './infrastructure/post.module';

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  app.enableCors({
    origin: 'https://friends-club.dev:3000',
    // credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(8000);
}
bootstrap();

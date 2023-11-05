import { NestFactory } from '@nestjs/core';
import { PostModule } from './infrastructure/post.module';

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    // credentials: true,
  });
  await app.listen(8000);
}
bootstrap();

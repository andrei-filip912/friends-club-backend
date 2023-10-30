import { NestFactory } from '@nestjs/core';
import { PostModule } from './infrastructure/post.module';

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  await app.listen(8000);
}
bootstrap();

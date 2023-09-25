import { NestFactory } from '@nestjs/core';
import { InteractionModule } from './interaction.module';

async function bootstrap() {
  const app = await NestFactory.create(InteractionModule);
  await app.listen(8001);
}
bootstrap();

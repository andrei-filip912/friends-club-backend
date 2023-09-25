import { Module } from '@nestjs/common';
import { InteractionController } from '../application/interaction.controller';
import { InteractionService } from '../domain/interaction.service';

@Module({
  imports: [],
  controllers: [InteractionController],
  providers: [InteractionService],
})
export class InteractionModule {}

import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateReactionRequest } from './dto/create-reaction-request.dto';
import { CreateReactionCommand } from './commands/create-reaction/create-reaction.command';

@Controller('reactions')
export class ReactionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(':id')
  async getReaction(): Promise<void> {}

  @Get()
  async getReactions(): Promise<void> {}

  @Post()
  async createReaction(
    @Body() createReactionRequest: CreateReactionRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateReactionCommand, void>(
      new CreateReactionCommand(createReactionRequest),
    );
  }

  @Delete()
  async deleteReaction(): Promise<void> {}
}

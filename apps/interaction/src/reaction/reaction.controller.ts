import { AuthorizationGuard } from '@friends-club/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateReactionCommand } from './commands/create-reaction/create-reaction.command';
import { CreateReactionRequest } from './dto/create-reaction-request.dto';

@Controller('reaction')
@UseGuards(AuthorizationGuard)
export class ReactionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(':id')
  async getReaction(): Promise<void> {}

  @Get()
  async getReactions(): Promise<void> {}

  @Post()
  async createReaction(
    @Req() req: Request,
    @Body() createReactionRequest: CreateReactionRequest,
  ): Promise<void> {
    console.log(req);
    await this.commandBus.execute<CreateReactionCommand, void>(
      new CreateReactionCommand(createReactionRequest),
    );
  }

  @Delete()
  async deleteReaction(): Promise<void> {}
}

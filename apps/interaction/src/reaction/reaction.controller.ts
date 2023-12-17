import { AuthorizationGuard } from '@friends-club/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateReactionCommand } from './commands/create-reaction/create-reaction.command';
import { CreateReactionRequest } from './dto/create-reaction-request.dto';
import { AuthRequest } from '@friends-club/common';
import { CreateOrUpdateReactionCommand } from './commands/create-or-update-reaction/create-or-update-reaction.command';
import { DeleteReactionCommand } from './commands/delete-reaction/delete-reaction.command';
import { DeleteReactionRequest } from './dto/delete-reaction-request.dto';

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
    @Req() req: AuthRequest,
    @Body() createReactionRequest: CreateReactionRequest,
  ): Promise<void> {
    createReactionRequest.userId = req.auth.sub;
    await this.commandBus.execute<CreateReactionCommand, void>(
      new CreateReactionCommand(createReactionRequest),
    );
  }

  @Put()
  async createOrUpdateReaction(
    @Req() req: AuthRequest,
    @Body() createReactionRequest: CreateReactionRequest,
  ): Promise<void> {
    createReactionRequest.userId = req.auth.sub;
    await this.commandBus.execute<CreateOrUpdateReactionCommand, void>(
      new CreateOrUpdateReactionCommand(createReactionRequest),
    );
  }

  @Delete()
  async deleteReaction(
    @Req() req: AuthRequest,
    @Body() deleteReactionRequest: DeleteReactionRequest,
  ): Promise<void> {
    deleteReactionRequest.userId = req.auth.sub;
    await this.commandBus.execute<DeleteReactionCommand, void>(
      new DeleteReactionCommand(deleteReactionRequest),
    );
  }
}

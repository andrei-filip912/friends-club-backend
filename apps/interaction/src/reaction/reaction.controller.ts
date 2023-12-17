import { AuthRequest, AuthorizationGuard } from '@friends-club/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrUpdateReactionCommand } from './commands/create-or-update-reaction/create-or-update-reaction.command';
import { CreateReactionCommand } from './commands/create-reaction/create-reaction.command';
import { DeleteReactionCommand } from './commands/delete-reaction/delete-reaction.command';
import { CreateReactionRequest } from './dto/create-reaction-request.dto';
import { DeleteReactionRequest } from './dto/delete-reaction-request.dto';
import { ReactionDto } from './dto/reaction.dto';
import { ReactionPerPostQuery } from './queries/reactions-per-post.query.ts/reaction-per-post.query';
import { ReactionPerPostRequest } from './dto/reaction-per-post-request.dto';

@Controller('reaction')
@UseGuards(AuthorizationGuard)
export class ReactionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('?')
  async getReaction(
    @Query() reaction: ReactionPerPostRequest,
  ): Promise<ReactionDto[]> {
    return this.queryBus.execute<ReactionPerPostQuery, ReactionDto[]>(
      new ReactionPerPostQuery(reaction),
    );
  }

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

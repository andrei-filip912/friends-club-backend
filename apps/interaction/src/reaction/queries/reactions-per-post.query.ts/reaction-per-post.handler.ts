import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReactionDtoRepository } from '../../db/reaction-dto.repository';
import { ReactionDto } from '../../dto/reaction.dto';
import { ReactionPerPostQuery } from './reaction-per-post.query';

@QueryHandler(ReactionPerPostQuery)
export class ReactionPerPostHandler
  implements IQueryHandler<ReactionPerPostQuery>
{
  constructor(private readonly reactionDtoRepository: ReactionDtoRepository) {}

  async execute({ reaction }: ReactionPerPostQuery): Promise<ReactionDto[]> {
    const reactions = await this.reactionDtoRepository.findAllPerPost(
      reaction.postId,
    );
    return reactions;
  }
}

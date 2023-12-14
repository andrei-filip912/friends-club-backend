import { EntitySchemaFactory } from '@friends-club/common';
import { Injectable } from '@nestjs/common';
import { ReactionSchema } from './reaction.schema';
import { Reaction } from '../Reaction';
import { Types } from 'mongoose';

@Injectable()
export class ReactionSchemaFactory
  implements EntitySchemaFactory<ReactionSchema, Reaction>
{
  create(reaction: Reaction): ReactionSchema {
    return {
      _id: new Types.ObjectId(reaction.getId()),
      userId: reaction.getUserId(),
      postId: reaction.getPostId(),
      reactionType: reaction.getReactionType(),
    };
  }
  createFromSchema(reactionSchema: ReactionSchema): Reaction {
    return new Reaction(
      reactionSchema._id.toHexString(),
      reactionSchema.userId,
      reactionSchema.postId,
      reactionSchema.reactionType,
    );
  }
}

import { ReactionType } from '@friends-club/common';

export class CreateReactionRequest {
  userId?: string;
  postId: number;
  reactionType: ReactionType;
}

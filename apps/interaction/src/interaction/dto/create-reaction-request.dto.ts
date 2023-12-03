import { ReactionType } from '@friends-club/common';

export class CreateReactionRequest {
  _id: string;
  userId: string;
  postId: number;
  reactionType: ReactionType;
}

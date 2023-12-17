import { ReactionType } from '@friends-club/common';

export class ReactionDto {
  readonly _id: string;
  readonly userId: string;
  readonly postId: number;
  readonly reactionType: ReactionType;
}

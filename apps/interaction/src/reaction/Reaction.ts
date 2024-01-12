import { ReactionType } from '@friends-club/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Reaction extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly userId: string,
    private readonly postId: number,
    private readonly reactionType: ReactionType,
  ) {
    super();
  }

  getId() {
    return this._id;
  }

  getUserId() {
    return this.userId;
  }

  getPostId() {
    return this.postId;
  }

  getReactionType() {
    return this.reactionType;
  }
}

import { ReactionType } from '@friends-club/common';

export class ReactionDeletedEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly type: ReactionType,
  ) {}

  toSting() {
    return `Reaction deleted { id: ${this.id}, userId: ${this.userId}, type: ${this.type}}}`;
  }
}

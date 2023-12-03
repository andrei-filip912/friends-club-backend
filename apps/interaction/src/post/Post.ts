import { AggregateRoot } from '@nestjs/cqrs';

export class Post extends AggregateRoot {
  constructor(
    private readonly id: number,
    private readonly userId: string,
  ) {
    super();
  }
  getId() {
    return this.id;
  }
  getUserId() {
    return this.userId;
  }
}

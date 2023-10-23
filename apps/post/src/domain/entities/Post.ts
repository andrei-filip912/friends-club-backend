// import { IdentifiableEntity } from '@friends-club/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Post extends AggregateRoot {
  constructor(
    private readonly id: number,
    private readonly caption: string,
    private readonly image_id: string,
  ) {
    super();
  }
  getId() {
    return this.id;
  }
  getCaption() {
    return this.caption;
  }
  getImageId() {
    return this.image_id;
  }
}

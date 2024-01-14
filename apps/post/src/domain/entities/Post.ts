// import { IdentifiableEntity } from '@friends-club/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Post extends AggregateRoot {
  readonly id: number;
  caption: string;
  readonly image_id: string;
  readonly userId: string;

  constructor(id: number, caption: string, image_id: string, userId: string);
  constructor(caption: string, image_id: string, userId: string);
  constructor(
    idOrCaption: number | string,
    caption?: string,
    image_id?: string,
    userId?: string,
  ) {
    super();

    if (typeof idOrCaption === 'number') {
      // Constructor with ID
      this.id = idOrCaption;
      this.caption = caption || '';
      this.image_id = image_id || '';
      this.userId = userId || '';
    } else {
      // Constructor without ID
      // Adjust the order of parameters in the following line
      this.caption = idOrCaption as string;
      this.image_id = caption || '';
      this.userId = image_id || '';
    }
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
  getUserId() {
    return this.userId;
  }

  updateCaption(caption: string): void {
    this.caption = caption;
  }
}

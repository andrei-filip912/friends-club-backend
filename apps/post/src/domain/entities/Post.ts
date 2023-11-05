// import { IdentifiableEntity } from '@friends-club/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Post extends AggregateRoot {
  id: number;
  caption: string;
  image_id: string;

  constructor(id: number, caption: string, image_id: string);
  constructor(caption: string, image_id: string);
  constructor(
    idOrCaption: number | string,
    caption?: string,
    image_id?: string,
  ) {
    super();

    if (typeof idOrCaption === 'number') {
      // Constructor with ID
      this.id = idOrCaption;
      this.caption = caption || '';
      this.image_id = image_id || '';
    } else {
      // Constructor without ID
      this.caption = idOrCaption;
      this.image_id = caption || '';
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
}

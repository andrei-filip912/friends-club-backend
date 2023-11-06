import { PostCreatedHandler } from './post-created/post-created.handler';
import { ImagePostAddedHandler } from './image-post-added/image-post-added.handler';
import { PostDeletedHandler } from './post-deleted/post-deleted.handler';

export const PostEventHandlers = [
  PostCreatedHandler,
  ImagePostAddedHandler,
  PostDeletedHandler,
];

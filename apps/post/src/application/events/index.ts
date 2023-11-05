import { PostCreatedHandler } from './post-created/post-created.handler';
import { ImagePostAddedHandler } from './image-post-added/image-post-added.handler';

export const PostEventHandlers = [PostCreatedHandler, ImagePostAddedHandler];

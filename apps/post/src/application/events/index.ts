import { PostCreatedHandler } from './post-created.handler';
import { ImagePostAddedHandler } from './image-post-added.handler';

export const PostEventHandlers = [PostCreatedHandler, ImagePostAddedHandler];

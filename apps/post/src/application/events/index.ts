import { TextPostCreatedHandler } from './text-post-created.handler';
import { ImagePostCreatedHandler } from './image-post-created.handler';

export const PostEventHandlers = [
  TextPostCreatedHandler,
  ImagePostCreatedHandler,
];

import { CreatePostHandler } from './create-post/create-pots.handler';
import { UpdateCaptiontHandler } from './update-caption/update-caption.handler';
import { DeletePostHandler } from './delete-post/delete-post.handler';

export const PostCommandHandlers = [
  CreatePostHandler,
  UpdateCaptiontHandler,
  DeletePostHandler,
];

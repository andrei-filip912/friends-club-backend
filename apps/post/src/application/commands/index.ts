import { CreatePostHandler } from './create-post/create-pots.handler';
import { UpdateCaptiontHandler } from './update-caption/update-caption.handler';
import { DeletePostHandler } from './delete-post/delete-post.handler';
import { DeleteUserPostsHandler } from './delete-user-posts/delete-user-post.handler';

export const PostCommandHandlers = [
  CreatePostHandler,
  UpdateCaptiontHandler,
  DeletePostHandler,
  DeleteUserPostsHandler,
];

import { CreateOrUpdateReactionHandler } from './create-or-update-reaction/create-or-update-reaction.handler';
import { CreateReactionHandler } from './create-reaction/create-reaction.handler';
import { DeleteReactionHandler } from './delete-reaction/delete-reaction.handler';

export const ReactionCommandHandlers = [
  CreateReactionHandler,
  CreateOrUpdateReactionHandler,
  DeleteReactionHandler,
];

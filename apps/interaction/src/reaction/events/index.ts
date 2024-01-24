import { ReactionCreatedHandler } from './reaction-created/reaction-created.handler';
import { ReactionDeletedEvent } from './reaction-deleted/reaction-deleted.event';

export const ReactionEventHandlers = [
  ReactionCreatedHandler,
  ReactionDeletedEvent,
];

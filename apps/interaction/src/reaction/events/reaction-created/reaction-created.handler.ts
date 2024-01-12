import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReactionCreatedEvent } from './reaction-create.event';

@EventsHandler()
export class ReactionCreatedHandler
  implements IEventHandler<ReactionCreatedEvent>
{
  async handle({ reactionId }: ReactionCreatedEvent) {
    console.log('reaction created: ', reactionId);
  }
}

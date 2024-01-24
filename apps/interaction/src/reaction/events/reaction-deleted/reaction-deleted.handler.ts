import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReactionDeletedEvent } from './reaction-deleted.event';

@EventsHandler(ReactionDeletedEvent)
export class ReactionDeletedHandler
  implements IEventHandler<ReactionDeletedEvent>
{
  async handle(event: ReactionDeletedEvent) {
    console.log(`AuditEvent | ${event.toSting()}`);
  }
}

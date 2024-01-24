import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReactionCreatedEvent } from './reaction-create.event';

@EventsHandler(ReactionCreatedEvent)
export class ReactionCreatedHandler
  implements IEventHandler<ReactionCreatedEvent>
{
  async handle(event: ReactionCreatedEvent) {
    console.log(`AuditEvent | Reaction created: ${event.toSting()}`);
  }
}

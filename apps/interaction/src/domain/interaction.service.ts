import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InteractionService {
  private readonly logger = new Logger(InteractionService.name);

  getHello(): string {
    return 'Hello World!';
  }

  createInteraction(data: any) {
    this.logger.log('Got an event!', data);
  }
}

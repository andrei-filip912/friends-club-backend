import { CreateReactionRequest } from '../../dto/create-reaction-request.dto';

export class CreateReactionCommand {
  constructor(public readonly createReactionRequest: CreateReactionRequest) {}
}

import { CreateReactionRequest } from '../../dto/create-reaction-request.dto';

export class CreateOrUpdateReactionCommand {
  constructor(public readonly createReactionRequest: CreateReactionRequest) {}
}

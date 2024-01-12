import { DeleteReactionRequest } from '../../dto/delete-reaction-request.dto';

export class DeleteReactionCommand {
  constructor(public readonly deleteReactionRequest: DeleteReactionRequest) {}
}

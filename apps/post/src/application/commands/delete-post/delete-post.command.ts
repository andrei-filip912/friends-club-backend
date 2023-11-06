import { DeletePostRequest } from '../../dto/delete-post-request.dto';

export class DeletePostCommand {
  constructor(public readonly deletePostRequest: DeletePostRequest) {}
}

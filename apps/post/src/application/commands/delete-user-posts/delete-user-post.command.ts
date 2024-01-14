import { DeleteUserPostsRequest } from '../../dto/delete-user-posts';

export class DeleteUserPostsCommand {
  constructor(public readonly deleteUserPostsRequest: DeleteUserPostsRequest) {}
}

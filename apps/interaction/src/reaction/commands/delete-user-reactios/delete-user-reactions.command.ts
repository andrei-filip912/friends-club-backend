import { DeleteUserReactionsRequest } from '../../dto/delete-user-reactions';

export class DeleteUserReactionsCommand {
  constructor(
    public readonly deleteUserInteractionsRequest: DeleteUserReactionsRequest,
  ) {}
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../../infrastructure/post.db-entity.repository';
import { DeleteUserPostsCommand } from './delete-user-post.command';
// no doamin event emmitted
@CommandHandler(DeleteUserPostsCommand)
export class DeleteUserPostsHandler
  implements ICommandHandler<DeleteUserPostsCommand>
{
  constructor(private readonly postRepository: PostRepository) {}

  async execute({
    deleteUserPostsRequest,
  }: DeleteUserPostsCommand): Promise<any> {
    const { userId } = deleteUserPostsRequest;

    await this.postRepository.deleteUsersPosts(userId);
  }
}

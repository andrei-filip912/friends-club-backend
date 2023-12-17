import { ReactionPerPostRequest } from '../../dto/reaction-per-post-request.dto';

export class ReactionPerPostQuery {
  constructor(public readonly reaction: ReactionPerPostRequest) {}
}

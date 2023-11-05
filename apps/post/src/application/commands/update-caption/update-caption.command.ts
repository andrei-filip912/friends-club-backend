import { UpdatePostCaptionRequest } from '../../dto/update-post-caption-request.dto';

export class UpdateCaptionCommand {
  constructor(public readonly updateCaptionRequest: UpdatePostCaptionRequest) {}
}

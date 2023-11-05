export class ImagePostAddedEvent {
  constructor(
    public readonly postId: number,
    public readonly image: Express.Multer.File,
  ) {}
}

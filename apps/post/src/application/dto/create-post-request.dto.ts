export class CreatePostRequest {
  caption: string;
  image: Express.Multer.File;
  userId: string;
}

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  getHello(): string {
    return 'Hello World!';
  }

  uploadPostImage(data: any) {
    this.logger.log('Image to be uploaded', data);
  }
}

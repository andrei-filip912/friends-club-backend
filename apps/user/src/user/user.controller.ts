import { AuthRequest, AuthorizationGuard } from '@friends-club/common';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthorizationGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id') userId: string,
    @Req() req: AuthRequest,
  ): Promise<void> {
    if (userId != req.auth.sub) {
      throw new UnauthorizedException('Ids do not match');
    }

    await this.userService.deleteUser(userId);
  }
}

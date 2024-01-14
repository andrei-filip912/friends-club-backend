import { AuthRequest, AuthorizationGuard } from '@friends-club/common';
import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
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
  deleteUser(
    @Param('id') userId: string,
    @Req() req: AuthRequest,
  ): Promise<void> {
    if (userId != req.auth.sub) {
      console.log(req.auth);
      throw new Error('ids do not match');
    }

    return this.userService.deleteUser(userId);
  }
}

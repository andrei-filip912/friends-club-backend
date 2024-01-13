import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthorizationGuard } from '@friends-club/common';

// @UseGuards(AuthorizationGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Delete(':id')
  deleteUser(): void {
    return this.userService.deleteUser();
  }
}

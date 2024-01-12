import { Controller, Delete, Get } from '@nestjs/common';
import { UserService } from './user.service';

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

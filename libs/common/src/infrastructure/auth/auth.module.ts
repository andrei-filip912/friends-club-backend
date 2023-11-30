import { Module } from '@nestjs/common';
import { AuthorizationGuard } from './auth.guard';

@Module({
  providers: [AuthorizationGuard],
  exports: [AuthorizationGuard],
})
export class AuthorizationModule {}

import { CanActivate, ExecutionContext } from '@nestjs/common';

// Mock the AuthorizationGuard
export class MockAuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // Mock the behavior you want here.
    return true; // Or whatever behavior you need for the test.
  }
}

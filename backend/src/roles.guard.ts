import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isRole = this.matchRoles(roles, user);
    if (!isRole) {
      throw new UnauthorizedException(
        "You don't have access to that ressource.",
      );
    }
    return isRole;
  }

  matchRoles(roles: string[], user) {
    return roles.some((role) => role === user.role_id.name);
  }
}

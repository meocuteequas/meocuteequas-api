import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (requiredRoles === undefined) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

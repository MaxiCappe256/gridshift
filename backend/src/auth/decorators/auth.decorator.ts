import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../enum/valid-roles.enum';
import { RoleProtected } from './role-protected.decorator';
import { RolesGuard } from '../guards/roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard('jwt'), RolesGuard),
  );
}

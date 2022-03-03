import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { authorizedUser } from "../auth/auth.guard";
import { UserData } from "../auth/auth.service";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./role.decorator";
import { Role } from "./role.model";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user: UserData = authorizedUser;
    const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    const isRoleExist: boolean = user.roles.some((role: Role) => requiredRoles.includes(role.value));
    if (!isRoleExist) throw new HttpException('user doesn\'t have permission', HttpStatus.FORBIDDEN);

    return isRoleExist;
  }
}
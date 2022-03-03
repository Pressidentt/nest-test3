import { CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserData } from "../auth/auth.service";
import { authorizedUser } from "../auth/auth.guard";

export class GetMembershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user: UserData = authorizedUser;
    const hasMembership: boolean = user.roles.some((role) => role.value === 'Membership');

    if (hasMembership) throw new HttpException('user has already a membership for this month',HttpStatus.BAD_REQUEST);
    return hasMembership;
  }
}
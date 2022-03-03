import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { UserData } from "./auth.service";

export let authorizedUser: UserData;

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const headerInfo: string[] = req.headers.authorization.split(' ');
      const bearer: string = headerInfo[0];
      const token: string = headerInfo[1];

      if (bearer !== 'Bearer' || !token) throw new UnauthorizedException({message: 'user is not authorized'});
      const user: UserData = this.jwtService.verify(token);

      authorizedUser = user;

      return true;
    } catch (e) {
      throw new UnauthorizedException({message: 'user is not authorized'});
    }
  }
}
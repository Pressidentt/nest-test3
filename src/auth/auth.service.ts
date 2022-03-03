import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import { RegisterUserDto } from "./dto/register-user.dto";
import { UserService } from "../user/user.service";
import { User } from "../user/user.model";
import { Role } from "../role/role.model";
import { LoginUserDto } from "./dto/login-user.dto";

export type Token = {token: string};
export type UserData = {
  nickname: string,
  email: string,
  id: number,
  roles: Role[],
  isBanned: boolean
};

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService,
              private readonly jwtService: JwtService) {}

  async register(dto: RegisterUserDto): Promise<Token> {
    //check if user already exist
    const candidate: User = await this.userService.getOne(dto.email);
    if (candidate) throw new HttpException('user already exist',HttpStatus.BAD_REQUEST);

    //hash the password and create the user in the database
    const hashedPassword: string = await bcrypt.hash(dto.password,5);
    const user: User = await this.userService.createUser({...dto, password: hashedPassword});

    return this.generateToken(user);
  }

  async logIn(dto: LoginUserDto): Promise<Token> {
    //check if user exist and is not banned
    const user: User = await this.userService.getOne(dto.email);
    if (!user) throw new HttpException('user doesn\'t exist',HttpStatus.NOT_FOUND)
    if (user.isBanned) throw new HttpException(`user is banned, reason: ${user.banReason}`,HttpStatus.FORBIDDEN);

    //check if the password is correct
    const isPasswordEqual: boolean = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordEqual) throw new HttpException('password is not valid',HttpStatus.FORBIDDEN);

    return this.generateToken(user);
  }

  private generateToken(user: User): Token {
    const payload: UserData = {
      nickname: user.nickname,
      email: user.email,
      id: user.id,
      roles: user.roles,
      isBanned: user.isBanned
    }

    return {token: this.jwtService.sign(payload)}
  }
}
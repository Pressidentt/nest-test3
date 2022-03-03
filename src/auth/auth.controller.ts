import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthService, Token } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async logIn(@Body() dto: LoginUserDto): Promise<Token> {
    const token: Token = await this.authService.logIn(dto);
    return token;
  }

  @Post('register')
  async register(@Body() dto: RegisterUserDto): Promise<Token> {
    const token: Token = await this.authService.register(dto);
    return token;
  }
}
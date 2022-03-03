import { Password } from "../../user/user.model";
import { IsEmail, IsString, Length } from "class-validator";

export class RegisterUserDto {
  @IsString({message: 'nickname must be a string'})
  readonly nickname: string;

  @IsString({message: 'email must be a string'})
  @IsEmail({},{message: 'email is not valid'})
  readonly email: string;

  @IsString({message: 'password must be a string'})
  @Length(4,16, {message: 'password length must be between 4 and 16'})
  readonly password: Password;
}
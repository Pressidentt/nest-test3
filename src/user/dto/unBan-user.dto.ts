import { IsEmail, IsString } from "class-validator";

export class UnBanUserDto {
  @IsString({message: 'email must be a string'})
  @IsEmail({},{message: 'email is not valid'})
  readonly email: string;
}
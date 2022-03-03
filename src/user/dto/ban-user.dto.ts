import { IsEmail, IsString } from "class-validator";

export class BanUserDto {
  @IsString({message: 'email must be a string'})
  @IsEmail({},{message: 'email is not valid'})
  readonly email: string;

  @IsString({message: 'ban reason must be a string'})
  readonly banReason: string
}
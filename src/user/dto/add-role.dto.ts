import { IsEmail, IsString } from "class-validator";

export class AddRoleDto {
  @IsString({message: 'email must be a string'})
  @IsEmail({},{message: 'email is not valid'})
  readonly email: string;

  @IsString({message: 'role value must be a string'})
  readonly value: string
}
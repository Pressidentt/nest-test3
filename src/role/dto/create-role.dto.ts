import { IsString } from "class-validator";

export class CreateRoleDto {
  @IsString({message: 'role value must be a string'})
  readonly value: string;

  @IsString({message: 'role description must be a string'})
  readonly description: string;
}
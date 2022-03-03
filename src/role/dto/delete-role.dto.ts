import { IsNumber } from "class-validator";

export class DeleteRoleDto {
  @IsNumber({},{message: 'role id must be a number'})
  readonly id: number;
}
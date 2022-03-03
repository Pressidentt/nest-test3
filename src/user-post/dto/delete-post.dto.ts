import { IsNumber } from "class-validator";

export class DeletePostDto {
  @IsNumber({},{message: 'post id must be a number'})
  readonly id: number;
}
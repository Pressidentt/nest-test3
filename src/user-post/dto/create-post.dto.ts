import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {
  @IsString({message: 'direction must be a string'})
  readonly direction: string;

  @IsString({message: 'criteria must be stings'})
  readonly criteria: string;

  @IsNumber({},{message: 'price must be a number'})
  readonly price: number;
}
import { HttpException, HttpStatus } from "@nestjs/common";

export class DataValidationException extends HttpException {
  messages: string[];

  constructor(response: string[]) {
    super(response,HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
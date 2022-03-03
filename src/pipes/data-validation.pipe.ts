import { ArgumentMetadata, Injectable, PipeTransform, ValidationError } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { DataValidationException } from "../common/exceptions/data-validation.exception";
import { validate } from "class-validator";

@Injectable()
export class DataValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj: any = plainToClass(metadata.metatype, value);
    const errors: ValidationError[] = await validate(obj);

    if (!errors.length) return value; //if there is no errors

    let messages = errors.map(error => `${error.property} - ${Object.values(error.constraints).join(', ')}`);
    throw new DataValidationException(messages);
  }
}
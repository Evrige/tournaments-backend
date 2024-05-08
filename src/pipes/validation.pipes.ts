import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidateException } from "../exceptions/validate.exception";

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj)

    if (errors.length) {
      let messages = errors.map(err => `${err.property} - ${Object.values(err.constraints).join(', ')}`)
      throw new ValidateException(messages)
    }
    return value;
  }
}
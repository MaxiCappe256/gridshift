import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const val = Number(value)

    if (isNaN(val)) {
      throw new BadRequestException("El id debe ser un numero")
    }

    return val;
  }
}

import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido debe ser un texto' })
  @Length(3, 50, { message: 'El apellido debe tener entre 3 y 50 caracteres' })
  surname: string;

  @IsOptional()
  age?: number;

  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsBoolean({ message: 'El pago debe ser verdadero o falso' })
  paid?: boolean;
}

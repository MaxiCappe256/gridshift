import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty({ message: 'El nombre del plan es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(2, 60, { message: 'El nombre debe tener entre 2 y 60 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El código del plan es obligatorio' })
  @IsString({ message: 'El código debe ser un texto' })
  @Length(2, 40, { message: 'El código debe tener entre 2 y 40 caracteres' })
  code: string;

  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @IsInt({ message: 'El precio debe ser un número entero' })
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  price: number;

  @IsOptional()
  @IsString()
  description?: string;
}

import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(2, 60, { message: 'El nombre debe tener entre 2 y 60 caracteres' })
  name?: string;

  @IsOptional()
  @IsInt({ message: 'El precio debe ser un número entero' })
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'updateExistingClients debe ser un booleano' })
  updateExistingClients?: boolean;
}

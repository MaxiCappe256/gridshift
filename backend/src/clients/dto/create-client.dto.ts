import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";

export class CreateClientDto {

  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser un texto" })
  @Length(3, 50, { message: "El nombre debe tener entre 3 y 50 caracteres" })
  name: string;

  @IsNotEmpty({ message: "El apellido es obligatorio" })
  @IsString({ message: "El apellido debe ser un texto" })
  @Length(3, 50, { message: "El apellido debe tener entre 3 y 50 caracteres" })
  surname: string;

  @IsNotEmpty({ message: "La edad es obligatoria" })
  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(10, { message: 'La edad mínima es 10' })
  @Max(100, { message: 'La edad máxima es 100' })
  age: number;

  @IsOptional()
  @IsString({ message: 'El telefono debe ser texto' })
  @Length(8, 15, {
    message: 'El teléfono debe tener entre 8 y 15 caracteres',
  })
  phone?: string;

  @IsOptional()
  @IsBoolean({ message: 'El pago debe ser verdadero o falso' })
  paid?: boolean;
}

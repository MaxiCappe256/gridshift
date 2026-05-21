import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoutineKind, RoutineObjective } from '../entities/routine.entity';
import { CreateRoutineExerciseDto } from './create-routine-exercise.dto';

export class CreateRoutineDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser texto' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  name: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  description?: string;

  @IsOptional()
  @IsEnum(RoutineKind, { message: 'El tipo de rutina no es válido' })
  kind?: RoutineKind;

  @IsNotEmpty({ message: 'El objetivo es obligatorio' })
  @IsEnum(RoutineObjective, { message: 'El objetivo de rutina no es válido' })
  objective: RoutineObjective;

  @IsNotEmpty({ message: 'La frecuencia semanal es obligatoria' })
  @IsInt({ message: 'La frecuencia semanal debe ser un número entero' })
  @Min(1, { message: 'La frecuencia semanal mínima es 1' })
  @Max(7, { message: 'La frecuencia semanal máxima es 7' })
  frequencyPerWeek: number;

  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser verdadero o falso' })
  isActive?: boolean;

  @IsOptional()
  @IsArray({ message: 'Los ejercicios deben ser una lista' })
  @ValidateNested({ each: true })
  @Type(() => CreateRoutineExerciseDto)
  exercises?: CreateRoutineExerciseDto[];
}

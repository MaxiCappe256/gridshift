import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateRoutineExerciseDto {
  @IsNotEmpty({ message: 'El día es obligatorio' })
  @IsString({ message: 'El día debe ser un texto' })
  @Length(1, 40, { message: 'El día debe tener entre 1 y 40 caracteres' })
  dayLabel: string;

  @IsInt({ message: 'El orden debe ser un número entero' })
  @Min(1, { message: 'El orden mínimo es 1' })
  order: number;

  @IsNotEmpty({ message: 'El ejercicio es obligatorio' })
  @IsString({ message: 'El ejercicio debe ser un texto' })
  @Length(2, 120, { message: 'El ejercicio debe tener entre 2 y 120 caracteres' })
  exerciseName: string;

  @IsInt({ message: 'Las series deben ser un número entero' })
  @Min(1, { message: 'Las series mínimas son 1' })
  sets: number;

  @IsNotEmpty({ message: 'Las repeticiones son obligatorias' })
  @IsString({ message: 'Las repeticiones deben ser texto' })
  @Length(1, 30, { message: 'Las repeticiones deben tener entre 1 y 30 caracteres' })
  reps: string;

  @IsOptional()
  @IsInt({ message: 'El descanso debe ser un número entero' })
  @Min(0, { message: 'El descanso no puede ser negativo' })
  restSeconds?: number;

  @IsOptional()
  @IsString({ message: 'Las notas deben ser texto' })
  notes?: string;
}

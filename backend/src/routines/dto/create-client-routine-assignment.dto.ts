import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { ClientRoutineAssignmentStatus } from '../entities/client-routine-assignment.entity';

export class CreateClientRoutineAssignmentDto {
  @IsNotEmpty({ message: 'El cliente es obligatorio' })
  @IsInt({ message: 'El id del cliente debe ser un número entero' })
  @Min(1, { message: 'El id del cliente es inválido' })
  clientId: number;

  @IsNotEmpty({ message: 'La rutina es obligatoria' })
  @IsInt({ message: 'El id de la rutina debe ser un número entero' })
  @Min(1, { message: 'El id de la rutina es inválido' })
  routineId: number;

  @IsOptional()
  @IsEnum(ClientRoutineAssignmentStatus, { message: 'El estado no es válido' })
  status?: ClientRoutineAssignmentStatus;

  @IsOptional()
  @IsInt({ message: 'El plan debe ser un número entero' })
  @Min(0, { message: 'El plan no puede ser negativo' })
  planSnapshot?: number;
}

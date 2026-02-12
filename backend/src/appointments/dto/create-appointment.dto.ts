import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { WeekDay } from "../enums/wek-day.enum";

export class CreateAppointmentDto {
  @IsEnum(WeekDay, { message: "Dia invalido" })
  day: WeekDay;

  @IsNotEmpty({ message: "La hora es obligatoria" })
  @IsString({ message: "La hora debe ser texto en formato HH:MM (Horas:Minutos)" })
  hour: string;

  @IsInt({ message: "El clienteId debe ser un numero" })
  clientId: number;
}

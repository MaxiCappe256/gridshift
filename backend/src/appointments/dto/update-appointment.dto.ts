import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { WeekDay } from '../enums/wek-day.enum';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  day?: WeekDay;

  @IsOptional()
  @IsString()
  hour?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  addClientId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  removeClientId?: number;
}

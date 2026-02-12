import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { WeekDay } from "../enums/wek-day.enum";
import { Client } from "src/clients/entities/client.entity";

@Unique(['day', 'hour'])
@Entity()
export class Appointment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: WeekDay })
  day: WeekDay;

  @Column({ type: 'time' })
  hour: string;

  @ManyToMany(() => Client, (client) => client.appointments, {
    cascade: true,
  })
  @JoinTable()
  clients: Client[];
}

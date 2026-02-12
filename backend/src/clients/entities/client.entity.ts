import { Appointment } from "src/appointments/entities/appointment.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class Client {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 60 })
  surname: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'boolean', default: false })
  paid: boolean

  @ManyToMany(() => Appointment, (appointment) => appointment.clients)
  appointments: Appointment[];
}

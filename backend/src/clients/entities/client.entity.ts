import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 60 })
  surname: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  debtCount?: number;

  @ManyToMany(() => Appointment, (appointment) => appointment.clients)
  appointments: Appointment[];

  @OneToMany(() => Payment, (payment) => payment.client)
  payment: Payment[];
}

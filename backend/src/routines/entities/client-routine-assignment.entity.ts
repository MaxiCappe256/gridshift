import { Client } from 'src/clients/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Routine } from './routine.entity';

export enum ClientRoutineAssignmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('client_routine_assignments')
export class ClientRoutineAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.routineAssignments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  client: Client;

  @ManyToOne(() => Routine, (routine) => routine.assignments, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  routine: Routine;

  @Column({
    type: 'enum',
    enum: ClientRoutineAssignmentStatus,
    default: ClientRoutineAssignmentStatus.ACTIVE,
  })
  status: ClientRoutineAssignmentStatus;

  @CreateDateColumn()
  assignedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endedAt?: Date;

  @Column({ type: 'int', nullable: true })
  planSnapshot?: number;
}

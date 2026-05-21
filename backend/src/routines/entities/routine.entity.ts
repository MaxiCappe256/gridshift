import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RoutineExercise } from './routine-exercise.entity';
import { ClientRoutineAssignment } from './client-routine-assignment.entity';

export enum RoutineKind {
  STANDARD = 'STANDARD',
  CUSTOM = 'CUSTOM',
}

export enum RoutineObjective {
  MUSCLE_GAIN = 'MUSCLE_GAIN',
  FAT_LOSS = 'FAT_LOSS',
  STRENGTH = 'STRENGTH',
  GENERAL_FITNESS = 'GENERAL_FITNESS',
}

@Entity('routines')
export class Routine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: RoutineKind,
    default: RoutineKind.STANDARD,
  })
  kind: RoutineKind;

  @Column({
    type: 'enum',
    enum: RoutineObjective,
  })
  objective: RoutineObjective;

  @Column({ type: 'int' })
  frequencyPerWeek: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => RoutineExercise, (routineExercise) => routineExercise.routine, {
    cascade: true,
  })
  exercises: RoutineExercise[];

  @OneToMany(
    () => ClientRoutineAssignment,
    (clientRoutineAssignment) => clientRoutineAssignment.routine,
  )
  assignments: ClientRoutineAssignment[];
}

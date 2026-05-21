import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Routine } from './routine.entity';

@Entity('routine_exercises')
export class RoutineExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  dayLabel: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'varchar', length: 120 })
  exerciseName: string;

  @Column({ type: 'int' })
  sets: number;

  @Column({ type: 'varchar', length: 30 })
  reps: string;

  @Column({ type: 'int', nullable: true })
  restSeconds?: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Routine, (routine) => routine.exercises, {
    onDelete: 'CASCADE',
  })
  routine: Routine;
}

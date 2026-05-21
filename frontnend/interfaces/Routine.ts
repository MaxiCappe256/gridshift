export interface Routine {
  id: number;
  name: string;
  description?: string;
  kind: RoutineKind;
  objective: RoutineObjective;
  frequencyPerWeek: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  exercises: RoutineExercise[];
}

export type RoutineKind = 'STANDARD' | 'CUSTOM';

export type RoutineObjective =
  | 'MUSCLE_GAIN'
  | 'FAT_LOSS'
  | 'STRENGTH'
  | 'GENERAL_FITNESS';

export interface RoutineExercise {
  id: number;
  dayLabel: string;
  order: number;
  exerciseName: string;
  sets: number;
  reps: string;
  restSeconds?: number;
  notes?: string;
}

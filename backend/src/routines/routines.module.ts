import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { Routine } from './entities/routine.entity';
import { RoutineExercise } from './entities/routine-exercise.entity';
import { ClientRoutineAssignment } from './entities/client-routine-assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Routine, RoutineExercise, ClientRoutineAssignment]),
  ],
  controllers: [RoutinesController],
  providers: [RoutinesService],
  exports: [TypeOrmModule, RoutinesService],
})
export class RoutinesModule {}

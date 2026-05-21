import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine, RoutineKind } from './entities/routine.entity';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
  ) { }

  async create(createRoutineDto: CreateRoutineDto) {
    const routineKind = createRoutineDto.kind ?? RoutineKind.STANDARD;

    this.validateRoutineExercises(
      createRoutineDto.frequencyPerWeek,
      createRoutineDto.exercises,
    );

    const existingRoutine = await this.routineRepository.findOne({
      where: {
        name: createRoutineDto.name,
        kind: routineKind,
        isActive: true,
      },
    });

    if (existingRoutine) {
      throw new ConflictException('Ya existe una rutina activa con ese nombre y tipo');
    }

    const routine = this.routineRepository.create({
      ...createRoutineDto,
      kind: routineKind,
    });
    return await this.routineRepository.save(routine);
  }

  async findAll() {
    return await this.routineRepository.find({
      relations: ['exercises'],
      order: { createdAt: 'DESC', exercises: { order: 'ASC' } },
    });
  }

  async findOne(id: number) {
    return await this.routineRepository.findOne({
      where: { id },
      relations: ['exercises', 'assignments'],
    });
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto) {
    const currentRoutine = await this.routineRepository.findOne({
      where: { id },
      relations: ['exercises'],
    });

    if (!currentRoutine) {
      throw new NotFoundException('La rutina no existe');
    }

    const nextKind = updateRoutineDto.kind ?? currentRoutine.kind;
    const nextName = updateRoutineDto.name ?? currentRoutine.name;
    const nextFrequency =
      updateRoutineDto.frequencyPerWeek ?? currentRoutine.frequencyPerWeek;
    const nextExercises = updateRoutineDto.exercises ?? currentRoutine.exercises;

    this.validateRoutineExercises(nextFrequency, nextExercises as any);

    const existingRoutine = await this.routineRepository.findOne({
      where: {
        name: nextName,
        kind: nextKind,
        isActive: true,
      },
    });

    if (existingRoutine && existingRoutine.id !== id) {
      throw new ConflictException('Ya existe una rutina activa con ese nombre y tipo');
    }

    const routine = await this.routineRepository.preload({
      id,
      ...updateRoutineDto,
    });

    if (!routine) throw new BadRequestException("No se pudo actualizar la rutina");

    return await this.routineRepository.save(routine);
  }

  async remove(id: number) {
    const routine = await this.routineRepository.findOneBy({ id });

    if (!routine) return null;

    await this.routineRepository.remove(routine);
    return { message: 'Rutina eliminada correctamente' };
  }

  private validateRoutineExercises(
    frequencyPerWeek?: number,
    exercises?: CreateRoutineExerciseDto[] | { dayLabel: string }[],
  ) {
    if (!frequencyPerWeek) return;

    if (!exercises || exercises.length === 0) {
      throw new BadRequestException(
        'Debes cargar ejercicios para todos los días de entrenamiento',
      );
    }

    const uniqueDays = new Set(
      exercises
        .map((exercise) => (exercise.dayLabel || '').trim().toLowerCase())
        .filter(Boolean),
    );

    if (uniqueDays.size !== frequencyPerWeek) {
      throw new BadRequestException(
        `La rutina tiene frecuencia ${frequencyPerWeek}, pero los ejercicios cubren ${uniqueDays.size} día(s).`,
      );
    }
  }
}

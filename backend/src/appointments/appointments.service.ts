import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, user: User) {
    // desestructuramos para trabajar mejor
    const { day, hour, clientId } = createAppointmentDto;

    // buscamos si existe el cliente
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
    });

    if (!client) {
      const errors: string[] = [];
      errors.push('El cliente no existe');
      throw new NotFoundException(errors);
    }

    // buscar si existe turno en ese dia y hora
    let appointment = await this.appointmentRepository.findOne({
      where: { day, hour },
      relations: ['clients'],
    });

    if (appointment) {
      // buscar si ese turno a esa hora y ese dia ya tiene a ese clientre
      const alredyIn = appointment.clients?.some((c) => c.id === clientId);

      if (alredyIn) {
        const errors: string[] = [];
        errors.push('El cliente ya esta anotado en ese turno');
        throw new BadRequestException(errors);
      }

      // agregar cliente al turno existente
      appointment.clients.push(client);
    } else {
      // crear el turno
      appointment = this.appointmentRepository.create({
        day,
        hour,
        clients: [client],
      });
    }

    return this.appointmentRepository.save(appointment);
  }

  async findAll() {
    const [data, total] = await this.appointmentRepository.findAndCount({
      relations: {
        clients: true,
      },
    });

    return {
      data,
      total,
    };
  }

  async findOne(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['clients'],
    });

    if (!appointment) {
      throw new NotFoundException('El turno no existe');
    }

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['clients'],
    });

    if (!appointment) {
      throw new NotFoundException('El turno no existe');
    }

    const { day, hour, addClientId, removeClientId } = updateAppointmentDto;

    // =========================
    // 1️⃣ Validar cambio de día/hora
    // =========================
    if (day || hour) {
      const newDay = day ?? appointment.day;
      const newHour = hour ?? appointment.hour;

      const existingAppointment = await this.appointmentRepository.findOne({
        where: { day: newDay, hour: newHour },
      });

      if (existingAppointment && existingAppointment.id !== id) {
        throw new BadRequestException('Ya existe un turno con ese día y hora');
      }

      appointment.day = newDay;
      appointment.hour = newHour;
    }

    // =========================
    // 2️⃣ Agregar cliente
    // =========================
    if (addClientId) {
      const client = await this.clientRepository.findOne({
        where: { id: addClientId },
      });

      if (!client) {
        throw new NotFoundException('El cliente no existe');
      }

      const alreadyIn = appointment.clients.some((c) => c.id === addClientId);

      if (alreadyIn) {
        throw new BadRequestException('El cliente ya está en este turno');
      }

      // lo agrego
      appointment.clients.push(client);
    }

    // =========================
    // 3️⃣ Quitar cliente
    // =========================
    if (removeClientId) {
      appointment.clients = appointment.clients.filter(
        (c) => c.id !== removeClientId,
      );
    }

    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      const errors: string[] = [];
      errors.push('El turno no existe');
      throw new NotFoundException(errors);
    }

    await this.appointmentRepository.remove(appointment);

    return 'Turno eliminado correctamente';
  }
}

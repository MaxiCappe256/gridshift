import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = await this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(client);
  }

  async findAll() {
    const [data, total] = await this.clientRepository.findAndCount({
      order: {
        paid: 'DESC',
      },
    });

    return {
      data,
      total,
    };
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client) {
      const errors: string[] = [];
      errors.push('El cliente no existe');
      throw new NotFoundException(errors);
    }

    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.preload({
      id,
      ...updateClientDto,
    });

    if (!client) {
      const errors: string[] = [];
      errors.push('El cliente no existe');
      throw new NotFoundException(errors);
    }

    return await this.clientRepository.save(client);
  }

  async remove(id: number) {
    const client = await this.findOne(id);

    await this.clientRepository.remove(client);

    return { message: 'Cliente eliminado correctamente' };
  }
}

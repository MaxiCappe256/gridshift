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
    // query builder para obtener los clientes y contar sus deudas
    const queryBuilder = this.clientRepository
      .createQueryBuilder('client')
      // busca en la relacion de payment recorre y cuenta los campos con isPaid = false
      .loadRelationCountAndMap(
        'client.debtCount',
        'client.payment',
        'p',
        (qb) => qb.andWhere('p.isPaid = :isPaid', { isPaid: false }),
      )
      .orderBy('client.name', 'ASC');

    const [data, total] = await queryBuilder.getManyAndCount();

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

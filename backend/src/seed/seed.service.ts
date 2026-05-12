import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { INITIAL_DATA, SEED_TEST_USER } from './seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.userRepository.upsert(
      {
        email: SEED_TEST_USER.email,
        password: SEED_TEST_USER.password,
        fullName: SEED_TEST_USER.fullName,
        isActive: true,
        roles: [...SEED_TEST_USER.roles],
      },
      { conflictPaths: ['email'] },
    );

    // limpiar la base de datos
    await this.clientRepository.createQueryBuilder().delete().execute();
    await this.paymentRepository.createQueryBuilder().delete().execute();

    // guardar clientes
    const dbClients = await this.clientRepository.save(INITIAL_DATA.clients);

    // preparar pagos
    const paymentsToSave = INITIAL_DATA.payments.map((payment) => {
      const { clientIndex, ...data } = payment;

      return this.paymentRepository.create({
        ...data,
        client: dbClients[clientIndex],
      });
    });

    // guardar pagos
    await this.paymentRepository.save(paymentsToSave);

    // retornar
    return {
      status: 'Success',
      message: 'Base de datos de prueba (Docker) poblada correctamente...',
      clientsInserted: dbClients.length,
      paymentsInserted: paymentsToSave.length,
    };
  }
}

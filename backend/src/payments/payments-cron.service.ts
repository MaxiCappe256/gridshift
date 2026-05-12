import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PaymentsCronService {
  private readonly logger = new Logger(PaymentsCronService.name);

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) { }

  // le dice a nestjs que cree el registro cada 1 de cada mes a las 00:00
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async handleMonthlyPayments() {
    this.logger.log('Iniciando proceso de generacion de deudas mensuales...');

    // buscamos todos los clientes actuales
    const clients = await this.clientRepository.find();

    const now = new Date();

    // month devuelve 0-11, sumamos 1 para que sea 1-12 humano
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    // creamos los registros de pago (deuda)

    const newDebts = clients.map((client) => {
      const payment = new Payment(); // Instanciamos la clase directamente
      payment.client = client;
      payment.amount = client.planAmount;
      payment.month = currentMonth;
      payment.year = currentYear;
      payment.isPaid = false;
      return payment;
    });

    // guardamos todos de una vez
    if (newDebts.length > 0) {
      await this.paymentRepository.save(newDebts);
      this.logger.log(
        `Se crearon ${newDebts.length} deudas para el mes ${currentMonth}/${currentYear}`,
      );
    } else {
      this.logger.warn('No hay clientes para generar deudas');
    }
  }
}

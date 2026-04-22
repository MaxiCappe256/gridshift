import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async getDebtDashboard(page: number = 1, limit: number = 10, term: string) {
    const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
    const safeLimit =
      Number.isFinite(limit) && limit > 0
        ? Math.min(Math.floor(limit), 100)
        : 10;
    const skip = (safePage - 1) * safeLimit;

    const queryBuilder = this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.client', 'client')
      .where('payment.isPaid = :isPaid', { isPaid: false });

    if (term) {
      queryBuilder.andWhere(
        '(client.name ILIKE :term OR client.surname ILIKE :term)',
        { term: `%${term}%` },
      );
    }

    const [debtorsDetail, totalUnpaidPayments] = await queryBuilder
      .orderBy('payment.year', 'DESC')
      .addOrderBy('payment.month', 'DESC')
      .limit(safeLimit)
      .offset(skip)
      .getManyAndCount();

    const totals = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('COALESCE(SUM(payment.amount), 0)', 'totalAmount')
      .where('payment.isPaid = :isPaid', { isPaid: false })
      .getRawOne<{ totalAmount: string }>();

    const debtorsCount = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('COUNT(DISTINCT payment."clientId")', 'totalDebtors')
      .where('payment.isPaid = :isPaid', { isPaid: false })
      .getRawOne<{ totalDebtors: string }>();

    return {
      totalAmount: Number(totals?.totalAmount ?? 0),
      totalDebtors: Number(debtorsCount?.totalDebtors ?? 0),
      debtorsDetail,
      totalPages: Math.max(1, Math.ceil(totalUnpaidPayments / safeLimit)),
      currentPage: safePage,
    };
  }

  async markAsPaid(id: string) {
    const payment = await this.paymentRepository.findOneBy({ id });

    if (!payment) throw new NotFoundException('Payment not found');

    if (payment.isPaid) throw new BadRequestException('Payments is true');

    payment.isPaid = true;
    payment.paymentDate = new Date();

    return this.paymentRepository.save(payment);
  }
}

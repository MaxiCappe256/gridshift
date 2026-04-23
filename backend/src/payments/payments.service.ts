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
  ) { }

  private calculateCurrentAmount(baseAmount: number): number {
    const day = new Date().getDate();

    if (day <= 15) return baseAmount;
    if (day <= 21) return Math.round(baseAmount * 1.10)

    return Math.round(baseAmount * 1.15)
  }

  async getDebtDashboard(page: number = 1, limit: number = 10, term: string) {
    const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
    const safeLimit =
      Number.isFinite(limit) && limit > 0
        ? Math.min(Math.floor(limit), 100)
        : 10;
    const skip = (safePage - 1) * safeLimit;

    const allUnpaidPayments = await this.paymentRepository.find({
      where: {
        isPaid: false
      },
      relations: ['client']
    })

    const totalAmountWhitInterest = allUnpaidPayments.reduce((acc, debt) => {
      return acc + this.calculateCurrentAmount(debt.amount)
    }, 0)

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



    const debtorsWithInterests = debtorsDetail.map(debt => ({
      ...debt,
      // Creamos una propiedad nueva para el frontend
      amountWithInterest: this.calculateCurrentAmount(debt.amount)
    }));

    const totalDebtors = new Set(allUnpaidPayments.map(p => p.client?.id)).size;


    return {
      totalAmount: totalAmountWhitInterest,
      totalDebtors,
      debtorsDetail: debtorsWithInterests,
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

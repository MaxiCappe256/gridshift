import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Client } from 'src/clients/entities/client.entity';
import { PaymentsCronService } from './payments-cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Client])],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsCronService],
})
export class PaymentsModule {}

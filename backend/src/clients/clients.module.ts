import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Payment])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}

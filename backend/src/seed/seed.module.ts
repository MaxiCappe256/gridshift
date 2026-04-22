import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Payment])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}

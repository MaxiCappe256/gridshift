import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { TreeLevelColumn } from 'typeorm';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('dashboard/debts')
  getDebts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('term') term?: string,
  ) {
    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 10;
    return this.paymentsService.getDebtDashboard(
      parsedPage,
      parsedLimit,
      term ?? '',
    );
  }

  @Patch(':id/pay')
  updatedStatus(@Param('id') id: string) {
    return this.paymentsService.markAsPaid(id);
  }
}

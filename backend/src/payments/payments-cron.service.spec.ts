import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsCronService } from './payments-cron.service';

describe('PaymentsCronService', () => {
  let service: PaymentsCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsCronService],
    }).compile();

    service = module.get<PaymentsCronService>(PaymentsCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

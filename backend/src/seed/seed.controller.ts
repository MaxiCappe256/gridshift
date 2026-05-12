import {
  Controller,
  Post,
  ForbiddenException,
  Headers,
  NotFoundException,
} from '@nestjs/common';
import { SeedService } from './seed.service';
import { ConfigService } from '@nestjs/config';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  executeSeed(@Headers('x-seed-token') seedToken?: string) {
    const nodeEnv = this.configService.get<string>('NODE_ENV') ?? 'development';

    // Never allow seeding in non-dev environments.
    // Using 404 reduces endpoint discovery.
    if (nodeEnv !== 'development') throw new NotFoundException();

    // Optional extra protection for shared dev environments.
    const expectedToken = this.configService.get<string>('SEED_TOKEN');
    if (expectedToken && seedToken !== expectedToken) {
      throw new ForbiddenException('Invalid seed token');
    }

    return this.seedService.runSeed();
  }
}

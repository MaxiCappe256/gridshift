import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { SeedService } from './seed.service';

async function run() {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const allowInProd = process.env.ALLOW_SEED_IN_PROD === 'true';

  if (nodeEnv !== 'development' && !allowInProd) {
    throw new Error(
      'Refusing to run seed outside development. Set ALLOW_SEED_IN_PROD=true to override.',
    );
  }

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    const seedService = app.get(SeedService);
    const result = await seedService.runSeed();
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await app.close();
  }
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});

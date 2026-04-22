import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { SeedModule } from './seed/seed.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        database: configService.get('DATABASE_NAME'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: configService.get('DATABASE_HOST')?.includes('localhost')
          ? false
          : { rejectUnauthorized: false },
      }),
    }),

    ClientsModule,
    AppointmentsModule,
    AuthModule,
    PaymentsModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

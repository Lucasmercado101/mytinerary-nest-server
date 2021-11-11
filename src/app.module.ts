import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './modules/cities/cities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SessionsModule } from './modules/sessions/sessions.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ItinerariesModule } from './modules/itineraries/itineraries.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CitiesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      // TODO: turn off in prod
      synchronize: true,
    }),
    SessionsModule,
    AuthModule,
    UsersModule,
    ItinerariesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { SessionsModule } from 'src/modules/sessions/sessions.module';

@Module({
  imports: [UsersModule, SessionsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

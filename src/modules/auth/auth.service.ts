import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { createUserDTO } from './dto/create-user.dto';
import { SessionsService } from 'src/modules/sessions/sessions.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
  ) {}

  register(newUserData: createUserDTO) {
    return this.usersService.createOne(newUserData);
  }

  async login(userData: createUserDTO) {
    const user = await this.usersService.findOneByUsername(userData.username);
    const { session_id } = await this.sessionsService.createSession(user.id);
    return session_id;
  }

  async logout(session_id: string) {
    return this.sessionsService.deleteSession(session_id);
  }

  async isLoggedIn(session_id: string) {
    return this.sessionsService.isValidSession(session_id);
  }

  async refreshSession(session_id: string, user_id: number) {
    return this.sessionsService.refreshSession(session_id, user_id);
  }
}

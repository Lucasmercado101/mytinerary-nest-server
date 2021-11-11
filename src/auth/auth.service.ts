import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { createUserDTO } from './dto/create-user.dto';
import { SessionsService } from 'src/sessions/sessions.service';

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
}

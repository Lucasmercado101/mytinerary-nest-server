import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  createSession(userId: number) {
    const sessionId = uuid().replace(/-/g, '');
    const TwentyFourHours = 24 * 60 * 60 * 1000;
    return this.sessionsRepository.save({
      user_id: userId,
      session_id: sessionId,
      expiration: new Date(Date.now() + TwentyFourHours),
    });
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { SessionsService } from 'src/modules/sessions/sessions.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(
    @Inject(SessionsService) private readonly sessionsService: SessionsService,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (await this.sessionsService.isValidSession(request.cookies.sid)) {
      const session = await this.sessionsService.getSession(
        request.cookies.sid,
      );
      const user = await this.usersService.findOneById(session.user_id);
      request.user = user;
      return true;
    } else {
      return false;
    }
  }
}

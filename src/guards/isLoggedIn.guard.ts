import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionsService } from 'src/sessions/sessions.service';
import { UsersService } from 'src/users/users.service';

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

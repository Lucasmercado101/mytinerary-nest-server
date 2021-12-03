import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDTO } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { IsLoggedInGuard } from 'src/guards/isLoggedIn.guard';
import { User as UserDecorator } from 'src/decorators/user.decorator';
import { User } from '../users/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() newUser: createUserDTO) {
    return this.authService.register(newUser);
  }

  @Post('login')
  async login(@Body() user: createUserDTO, @Res() response: Response) {
    const sessionId = await this.authService.login(user);
    response.cookie('sid', sessionId);
    return response.json(
      await this.usersService.findOneByUsername(user.username),
    );
  }

  @Get('logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    if (request.cookies.sid) {
      await this.authService.logout(request.cookies.sid);
      response.clearCookie('sid');
    }
    return response.sendStatus(204);
  }

  @Get('isLoggedIn')
  async isLoggedIn(@Req() request: Request, @Res() response: Response) {
    if (request.cookies.sid) {
      const isLoggedIn = await this.authService.isLoggedIn(request.cookies.sid);
      return response.sendStatus(isLoggedIn ? 200 : 401);
    }
    return response.sendStatus(401);
  }

  @Post('refresh')
  @UseGuards(IsLoggedInGuard)
  async refresh(
    @Req() request: Request,
    @Res() response: Response,
    @UserDecorator() user: User,
  ) {
    if (request.cookies.sid) {
      const sessionId = await this.authService.refreshSession(
        request.cookies.sid,
        user.id,
      );
      console.log(sessionId.session_id);
      response.cookie('sid', sessionId.session_id);
      return response.sendStatus(200);
    }
    return response.sendStatus(401);
  }
}

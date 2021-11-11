import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDTO } from './dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() newUser: createUserDTO) {
    return this.authService.register(newUser);
  }

  @Post('login')
  async login(@Body() user: createUserDTO, @Res() response: Response) {
    const sessionId = await this.authService.login(user);
    response.cookie('sid', sessionId);
    return response.status(204);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDTO } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() newUser: createUserDTO) {
    return this.authService.register(newUser);
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { createUserDTO } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(newUserData: createUserDTO) {
    return this.usersService.createOne(newUserData);
  }
}

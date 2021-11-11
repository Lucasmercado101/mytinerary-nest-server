import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { PromisifiedBcryptHash } from 'src/utils';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createOne(newUserData: CreateUserDTO): Promise<UserDTO> {
    if ((await this.checkIfUserExists(newUserData.username)) === true)
      throw new ConflictException('User already exists');

    return await PromisifiedBcryptHash(newUserData.password, 10)
      .then(async (hash) => {
        const resp = await this.usersRepository.save({
          username: newUserData.username,
          password: hash,
        });

        return { id: resp.id, username: resp.username };
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }

  private async checkIfUserExists(username: string): Promise<boolean> {
    const resp = await this.usersRepository.findOne({
      where: { username },
    });

    return !!resp;
  }
}

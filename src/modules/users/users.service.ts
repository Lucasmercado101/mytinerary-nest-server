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
import * as Either from 'fp-ts/lib/Either';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository
      .findOne({ where: { username } })
      .then((user) => {
        delete user.password;
        return user;
      });
  }

  public async findOneById(
    id: number,
  ): Promise<Either.Either<Omit<User, 'password'>, any>> {
    return this.usersRepository
      .findOne({ where: { id } })
      .then((user?: User) => {
        if (user) {
          delete user.password;
          return Either.right(user);
        }
      })
      .catch((err) => {
        return Either.left(err);
      });
  }

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

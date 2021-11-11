import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  profilePic?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

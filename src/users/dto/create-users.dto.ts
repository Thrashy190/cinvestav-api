import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../users.schema';

export class CreateUserDto extends PickType(User, [
  'identifier',
  'password',
  'role',
]) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(args?: Partial<CreateUserDto>) {
    super();
    Object.assign(this, args);
  }
}

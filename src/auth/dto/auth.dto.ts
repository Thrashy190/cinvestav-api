import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/users.schema';

export class AuthDto extends PickType(User, ['identifier', 'password']) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(args?: Partial<AuthDto>) {
    super();
    Object.assign(this, args);
  }
}

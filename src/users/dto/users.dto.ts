import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UserDto extends User {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  identifier: string;

  @ApiResponseProperty()
  password: string;

  @ApiResponseProperty()
  role: string;

  @ApiResponseProperty()
  acceptTermsAndConditions: boolean;

  constructor(args?: Partial<UserDto>) {
    super();
    Object.assign(this, args);
  }
}

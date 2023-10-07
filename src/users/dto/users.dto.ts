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
  accept_terms_and_conditions: boolean;

  @ApiResponseProperty()
  created_at: Date;

  constructor(args?: Partial<UserDto>) {
    super();
    Object.assign(this, args);
  }
}

import { ApiResponseProperty } from '@nestjs/swagger';
import { Cadet } from '../cadets.schema';

export class CadetDto extends Cadet {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  identifier: string;

  @ApiResponseProperty()
  gender: string;

  @ApiResponseProperty()
  rank: string;

  @ApiResponseProperty()
  birthDate: Date;

  @ApiResponseProperty()
  maritalStatus: string;

  constructor(args?: Partial<CadetDto>) {
    super();
    Object.assign(this, args);
  }
}

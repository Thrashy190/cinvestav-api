import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Cadet } from '../cadets.schema';

export class CreateCadetDto extends PickType(Cadet, [
  'identifier',
  'gender',
  'rank',
  'maritalStatus',
]) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rank: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  maritalStatus: string;

  constructor(args?: Partial<CreateCadetDto>) {
    super();
    Object.assign(this, args);
  }
}

import { PartialType } from '@nestjs/swagger';
import { CreateCadetDto } from './create-cadet.dto';

export class UpdateCadetDto extends PartialType(CreateCadetDto) {}

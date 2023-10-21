import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { FileDto } from './file.dto';

export class FileManageDto extends PickType(FileDto, ['file']) {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;

  constructor(args?: Partial<FileManageDto>) {
    super();
    Object.assign(this, args);
  }
}

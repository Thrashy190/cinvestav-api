import { ApiResponseProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiResponseProperty()
  file: Express.Multer.File;

  constructor(args?: Partial<FileDto>) {
    Object.assign(this, args);
  }
}

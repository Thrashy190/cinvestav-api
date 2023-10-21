import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  Param,
  Get,
  Res,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/jwtAuth.guard';
import { FileManageDto } from './dto/file-manage.dto';
import { diskStorage } from 'multer';
import { homedir } from 'os';
import { join } from 'path';
import { createReadStream, readFileSync } from 'fs';
import { FilesService } from './files.service';

@ApiTags('Files API')
//@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload-file/:id')
  @ApiOperation({ summary: 'Upload file' })
  //@UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(homedir(), 'uploads', 'images'),
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${file.originalname}`);
        },
      }),
    }),
  )
  uploadFile(
    @Res() response,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = this.filesService.addImagesToCadet(id, file);
    return response.status(200).json({ result });
  }

  @Post('upload-files')
  @ApiOperation({ summary: 'Upload multiple files' })
  //@UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', null, {
      storage: diskStorage({
        destination: join(homedir(), 'uploads', 'images'),
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${file.originalname}`);
        },
      }),
    }),
  )
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Get('download-file/:id')
  @ApiOperation({ summary: 'Download file' })
  //@UseGuards(AuthGuard)
  async downloadFile(@Res() response, @Param('id') id: string) {
    const files = await this.filesService.getFiles(id);
    console.log(files);
    return response.status(200).json({ files });
  }
}

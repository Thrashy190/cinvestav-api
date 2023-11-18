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

import { FilesService } from './files.service';
import { multerOptions } from 'src/config/multer';

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
    FileInterceptor('file', multerOptions),
  )
  uploadFile(
    @Res() response,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = this.filesService.addImagesToCadet(id, file);
    return response.status(200).json({ result });
  }

  @Post('upload-files/:id')
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
    FilesInterceptor('files', null, multerOptions),
  )
  uploadFiles( @Res() response, @UploadedFiles() files: Array<Express.Multer.File>, @Param('id') id: string,) {
    for (const file of files) {
      const result = this.filesService.addImagesToCadet(id, file);
    }
    return response.status(200).json({status: "success"});
  }

  @Get('download-file/:id')
  @ApiOperation({ summary: 'Download file' })
  //@UseGuards(AuthGuard)
  async downloadFile(@Res() response, @Param('id') id: string) {
    const files = await this.filesService.getFiles(id);
    return response.status(200).json( files );
  }
}

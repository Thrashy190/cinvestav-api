import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { Cadet, CadetSchema } from 'src/cadets/cadets.schema';
import { JwtService } from '@nestjs/jwt';
import { File, FileSchema } from './file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cadet.name, collection: 'cadets', schema: CadetSchema },
      { name: File.name, collection: 'files', schema: FileSchema },
    ]),
    FilesModule,
  ],
  providers: [FilesService, JwtService],
  controllers: [FilesController],
})
export class FilesModule {}

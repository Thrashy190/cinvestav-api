import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CadetsService } from './cadets.service';
import { CadetsController } from './cadets.controller';
import { Cadet, CadetSchema } from './cadets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cadet.name,collection:"cadets", schema: CadetSchema }]),
    CadetsModule,
  ],
  controllers: [CadetsController],
  providers: [CadetsService],
})
export class CadetsModule {}

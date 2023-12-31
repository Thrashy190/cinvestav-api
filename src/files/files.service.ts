import { Model } from 'mongoose';
import { Injectable,NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cadet } from 'src/cadets/cadets.schema';
import { File } from './file.schema';
import { readFileSync } from 'fs';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(Cadet.name) private cadetModel: Model<Cadet>,
    @InjectModel(File.name) private fileModel: Model<File>,
  ) {}

  async addImagesToCadet(id: string, file: Express.Multer.File) {

    const result = this.cadetModel.findOne({ identifier: id }).exec();

    if (!result) {
      throw new NotFoundException('User not found');
    }

    const savedFile = await new this.fileModel({
      cadetId: id,
      data: readFileSync(file.path),
      contentType: file.mimetype,
    }).save();

    return await this.cadetModel.findOneAndUpdate(
      { identifier: id },
      { $push: { files: savedFile._id } },
    );
  }

  

  async getFiles(id: string) {
    const filter = { cadetId: id };
    return await this.fileModel.find(filter).exec();
  }
}

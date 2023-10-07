import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cadet } from './cadets.schema';

@Injectable()
export class CadetsService {
  constructor(@InjectModel(Cadet.name) private cadetModel: Model<Cadet>) {}

  async createCadet(cadet: Partial<Cadet>): Promise<Cadet> {
    return await new this.cadetModel(cadet).save();
  }

  async getCadets(): Promise<Cadet[]> {
    return await this.cadetModel.find();
  }

  async getCadet(id: string) {
    const filter = { _id: id };
    return await this.cadetModel.findOne(filter).exec();
  }
}

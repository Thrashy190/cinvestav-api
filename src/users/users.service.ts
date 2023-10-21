import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async getUserByIdentifier(identifier: string): Promise<User> {
    return await this.userModel.findOne({ identifier: identifier });
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async acceptTermsAndConditions(id: string) {
    const update = { accept_terms_and_conditions: true };
    const filter = { _id: id };
    const options = { new: true };

    return await this.userModel
      .findOneAndUpdate(filter, update, options)
      .exec();
  }
}

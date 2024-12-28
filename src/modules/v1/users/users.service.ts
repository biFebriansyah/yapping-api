import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.schema';
import { GetUserDto, CreateUserDto } from './users.dto';

@Injectable()
class UserService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async getAllUser(): Promise<GetUserDto[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async createUser(body: CreateUserDto): Promise<any> {
    try {
      return new this.userModel({ ...body }).save();
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;

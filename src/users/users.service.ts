import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, ClientSession, Types } from 'mongoose';
import { Users } from './users.schema';
import { Profiles } from '../profile/profile.schema';
import { CreateUserDto } from './users.dto';

@Injectable()
class UserService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Users.name) private userModel: Model<Users>,
    @InjectModel(Profiles.name) private profileModel: Model<Profiles>,
  ) {}

  private imageDumy: string =
    'https://res.cloudinary.com/antikey/image/upload/v1730469025/assets/a0_t0mr7b.jpg';

  async getAllUser(): Promise<any> {
    try {
      const data = await this.userModel
        .find({}, { password: 0 })
        .populate('profile')
        .exec();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getPasswordByUsername(username: string): Promise<any> {
    try {
      const user = await this.userModel
        .findOne({ username }, { password: 1, _id: 1, profile: 1 })
        .exec();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserData(userId: string): Promise<any> {
    try {
      const objectId = new Types.ObjectId(userId);
      const data = await this.userModel
        .findOne({ _id: objectId }, { password: 0 })
        .exec();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserDetail(userId: string): Promise<any> {
    try {
      const objectId = new Types.ObjectId(userId);
      const data = await this.userModel
        .findOne({ _id: objectId }, { password: 0 })
        .populate('profile')
        .exec();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async createUser(body: CreateUserDto): Promise<any> {
    let session: ClientSession;
    try {
      const objectId = new Types.ObjectId();
      session = await this.connection.startSession();
      session.startTransaction();

      const profile = await new this.profileModel({
        ...body,
        userId: objectId,
        fullName: body.fullname,
        picture: this.imageDumy,
      }).save({ session });

      await new this.userModel({
        ...body,
        _id: objectId,
        profile: profile._id,
      }).save({ session });

      await session.commitTransaction();
      return { userId: objectId, profile: profile._id };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default UserService;

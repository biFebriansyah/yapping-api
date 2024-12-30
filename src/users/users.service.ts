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
      return await this.userModel.find({}, { password: 0 }).exec();
    } catch (error) {
      throw error;
    }
  }

  // ! populate still not works
  async getUserDetail(_id: string): Promise<any> {
    try {
      const userId = new Types.ObjectId(_id);
      console.log(userId);
      const data = await this.profileModel
        .findOne({ userId })
        .populate({ path: 'users' })
        .exec();

      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createUser(body: CreateUserDto): Promise<any> {
    let session: ClientSession;
    try {
      session = await this.connection.startSession();
      session.startTransaction();

      const { userId } = await new this.userModel({ ...body }).save({
        session,
      });

      const { profileId } = await new this.profileModel({
        userId,
        fullName: body.fullname,
        picture: this.imageDumy,
      }).save({ session });

      await session.commitTransaction();
      return { userId, profileId };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default UserService;

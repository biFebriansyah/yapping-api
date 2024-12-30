import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, Types } from 'mongoose';
import { Profiles } from './profile.schema';
import { CreateProfileDto } from './profile.dto';

@Injectable()
class ProfileService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Profiles.name) private profileModel: Model<Profiles>,
  ) {}

  private imageDumy: string =
    'https://res.cloudinary.com/antikey/image/upload/v1730469025/assets/a0_t0mr7b.jpg';

  async getAll(): Promise<any> {
    try {
      return await this.profileModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async getOne(_id: string): Promise<any> {
    try {
      const profileId = new Types.ObjectId(_id);
      const data = await this.profileModel.findOne({ profileId }).exec();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createOne(body: CreateProfileDto): Promise<any> {
    try {
      const picture = body.picture || this.imageDumy;
      const { profileId } = await new this.profileModel({
        ...body,
        picture,
      }).save();

      return profileId;
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileService;

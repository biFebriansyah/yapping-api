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

  async getOne(profileId: string): Promise<any> {
    try {
      const objectId = new Types.ObjectId(profileId);
      const data = await this.profileModel.findOne({ _id: objectId }).exec();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getByUserId(userId: string): Promise<any> {
    try {
      const objectId = new Types.ObjectId(userId);
      const data = await this.profileModel.findOne({ userId: objectId }).exec();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createOne(body: CreateProfileDto): Promise<any> {
    try {
      const picture = body.picture || this.imageDumy;
      const { _id } = await new this.profileModel({
        ...body,
        picture,
      }).save();

      return _id;
    } catch (error) {
      throw error;
    }
  }

  async patchOne(body: CreateProfileDto): Promise<any> {
    try {
      const profileId = new Types.ObjectId(body.profileId);
      const picture = body.picture || this.imageDumy;
      const respone = await this.profileModel
        .updateOne({ _id: profileId }, { ...body, picture })
        .exec();

      return respone.modifiedCount;
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileService;

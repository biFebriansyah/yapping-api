import { Types } from 'mongoose';

class CreateProfileDto {
  readonly userId: Types.ObjectId;
  readonly fullName: string;
  readonly email: string;
  readonly picture: string;
  readonly address: string;
}

class GetProfileDto {
  readonly profileId: Types.ObjectId;
  readonly userId: Types.ObjectId;
  readonly fullName: string;
  readonly email: string;
  readonly picture: string;
  readonly address: string;
}

export { CreateProfileDto, GetProfileDto };

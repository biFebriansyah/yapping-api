class CreateProfileDto {
  readonly profileId: string;
  readonly fullName: string;
  readonly email: string;
  readonly picture: string;
  readonly address: string;
}

class GetProfileDto {
  readonly profileId: string;
  readonly fullName: string;
  readonly email: string;
  readonly picture: string;
  readonly address: string;
}

export { CreateProfileDto, GetProfileDto };

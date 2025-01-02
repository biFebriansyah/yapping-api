class CreateUserDto {
  readonly username: string;
  readonly fullname: string;
  readonly email: string;
  readonly phone: number;
  readonly password: string;
}

class GetUserDto {
  readonly _id: string;
  readonly username: string;
  readonly phone: number;
  readonly profileId: string;
}

export { CreateUserDto, GetUserDto };

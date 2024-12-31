class CreateUserDto {
  readonly username: string;
  readonly fullname: string;
  readonly email: string;
  readonly phone: number;
  readonly password: string;
}

class GetUserDto {
  readonly userId: string;
  readonly username: string;
  readonly phone: number;
}

export { CreateUserDto, GetUserDto };

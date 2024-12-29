class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

class GetUserDto {
  readonly username: string;
  readonly email: string;
}

export { CreateUserDto, GetUserDto };

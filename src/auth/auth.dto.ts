class SignAuthDto {
  readonly username: string;
  readonly password: string;
}

class TokenAuthDto {
  readonly token: string;
}

export { SignAuthDto, TokenAuthDto };

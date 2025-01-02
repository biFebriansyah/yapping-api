import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadGatewayException,
  HttpException,
} from '@nestjs/common';
import { SignInAuthDto, SignUpAuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Validate } from '../utils/bcrypt';
import { HashPass } from '@utils/bcrypt';
import UserService from '../users/users.service';

@Controller('auth')
class UserController {
  constructor(
    private readonly service: UserService,
    private readonly jwt: JwtService,
  ) {}

  @Post('/signup')
  async createOne(@Body() body: SignUpAuthDto): Promise<any> {
    try {
      const password = await HashPass(body.password);
      return this.service.createUser({ ...body, password });
    } catch (error) {
      throw error;
    }
  }

  @Post('/signin')
  async sigin(@Body() body: SignInAuthDto): Promise<any> {
    try {
      const user = await this.service.getPasswordByUsername(body.username);
      if (!user?.password) {
        throw new UnauthorizedException('email not regiter');
      }

      const isPasswordValid = await Validate(body.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('wrong password');
      }

      const payload = {
        userId: user._id,
        profileId: user.profile,
        username: body.username,
      };
      return { token: await this.jwt.signAsync(payload) };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadGatewayException(error);
    }
  }
}

export default UserController;

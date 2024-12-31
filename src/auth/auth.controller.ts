import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadGatewayException,
} from '@nestjs/common';
import { SignAuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import UserService from '../users/users.service';
import { Validate } from '../utils/bcrypt';

@Controller('auth')
class UserController {
  constructor(
    private readonly service: UserService,
    private readonly jwt: JwtService,
  ) {}

  @Post('/sigin')
  async sigin(@Body() body: SignAuthDto): Promise<any> {
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
        userId: user.userId,
        profileId: user.profile,
        username: body.username,
      };
      return { token: await this.jwt.signAsync(payload) };
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}

export default UserController;

import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { GetUserDto } from './users.dto';
import UserService from './users.service';
import AuthGuard from '@utils/auth.guard';
import { Public } from '@utils/decorator';

@Controller('users')
@UseGuards(AuthGuard)
class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/all')
  @Public()
  async getAll(): Promise<GetUserDto[]> {
    try {
      return this.service.getAllUser();
    } catch (error) {
      throw error;
    }
  }

  @Get('/detail')
  async getDetail(@Request() req: any): Promise<GetUserDto> {
    try {
      return await this.service.getUserDetail(req.users.userId);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getOne(@Request() req: any): Promise<GetUserDto> {
    try {
      return await this.service.getUserData(req.users.userId);
    } catch (error) {
      throw error;
    }
  }
}

export default UserController;

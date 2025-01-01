import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GetUserDto, CreateUserDto } from './users.dto';
import UserService from './users.service';
import { HashPass } from '@utils/bcrypt';
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

  @Post()
  @Public()
  async createOne(@Body() body: CreateUserDto): Promise<any> {
    try {
      const password = await HashPass(body.password);
      return this.service.createUser({ ...body, password });
    } catch (error) {
      throw error;
    }
  }
}

export default UserController;

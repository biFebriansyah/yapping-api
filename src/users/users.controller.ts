import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { GetUserDto, CreateUserDto } from './users.dto';
import UserService from './users.service';
import { HashPass } from '@utils/bcrypt';
import AuthGuard from '@app/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':userId')
  async getOne(@Param() params: any): Promise<any> {
    try {
      return await this.service.getUserDetail(params.userId);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAll(): Promise<GetUserDto[]> {
    try {
      return this.service.getAllUser();
    } catch (error) {
      throw error;
    }
  }

  @Post()
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

import { Controller, Get, Post, Body } from '@nestjs/common';
import { GetUserDto, CreateUserDto } from './users.dto';
import UserService from './users.service';
import { HashPass } from '@utils/bcrypt';

@Controller('users')
class UserController {
  constructor(private readonly service: UserService) {}

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

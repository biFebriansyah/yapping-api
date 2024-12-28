import { Controller, Get, Post, Body } from '@nestjs/common';
import { GetUserDto, CreateUserDto } from './users.dto';
import UserService from './users.service';

@Controller('users')
class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getAll(): Promise<GetUserDto[]> {
    return this.service.getAllUser();
  }

  @Post()
  async createOne(@Body() body: CreateUserDto): Promise<any> {
    return this.service.createUser(body);
  }
}

export default UserController;

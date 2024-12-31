import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { GetProfileDto, CreateProfileDto } from './profile.dto';
import ProfileSvc from './profile.service';
import AuthGuard from '@app/guards/auth.guard';

@Controller('profile')
@UseGuards(AuthGuard)
class ProfileController {
  constructor(private readonly service: ProfileSvc) {}

  @Get(':profileId')
  async getOne(@Param() params: any): Promise<GetProfileDto> {
    try {
      return await this.service.getOne(params.profileId);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAll(): Promise<GetProfileDto[]> {
    try {
      return this.service.getAll();
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async createOne(@Body() body: CreateProfileDto): Promise<any> {
    try {
      return this.service.createOne({ ...body });
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileController;

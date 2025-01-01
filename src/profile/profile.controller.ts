import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { GetProfileDto, CreateProfileDto } from './profile.dto';
import ProfileSvc from './profile.service';
import AuthGuard from '@utils/auth.guard';
import { UploadedFile as Uploads } from '../utils/cloudinary';

@Controller('profile')
@UseGuards(AuthGuard)
class ProfileController {
  constructor(private readonly service: ProfileSvc) {}

  @Get('/all')
  async getAll(): Promise<GetProfileDto[]> {
    try {
      return this.service.getAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/guest/:userId')
  async getOne(@Param() params: any): Promise<GetProfileDto> {
    try {
      return await this.service.getByUserId(params.userId);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getProfile(@Request() req: any): Promise<GetProfileDto> {
    try {
      return await this.service.getOne(req.users.profileId);
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

  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  async updateOne(
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProfileDto,
  ): Promise<any> {
    try {
      const urlPicture = await Uploads(file.path);
      return await this.service.patchOne({
        ...body,
        profileId: req.users.profileId,
        picture: urlPicture,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileController;

import {
  Body,
  Controller,
  UseGuards,
  ValidationPipe,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { UserProfileService } from './user_profile.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { UserProfileModel } from '../dto/index';

@Controller('user_profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  //update user-profile
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student')
  async updateUserProfile(
    @Param('id') id: number,
    @Body(new ValidationPipe()) userProfileModel: UserProfileModel,
  ) {
    return await this.userProfileService.update(id, userProfileModel);
  }

  //get user's profile details
  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async findUserProfile(@Param('id') id: number) {
    return this.userProfileService.findByUserId(id);
  }
}

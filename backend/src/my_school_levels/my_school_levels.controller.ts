import {
  Body,
  Controller,
  Get,
  Req,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MySchoolLevelsService } from './my_school_levels.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
import { MySchoolLevelsModel, MySchoolLevelSubjectsModel } from '../dto/index';

@Controller('my-school-levels')
export class MySchoolLevelsController {
  constructor(private readonly mySchoolLevelsService: MySchoolLevelsService) {}

  //create school levels
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student')
  async createSchoolLevels(
    @Body(new ValidationPipe())
    mySchoolLevelsModel: MySchoolLevelsModel,
  ) {
    try {
      return await this.mySchoolLevelsService.createSchoolLevels(
        mySchoolLevelsModel,
      );
    } catch (error) {
      return {
        message: 'Failed to create school levels.',
        error: error.message,
      };
    }
  }

  //find all school levels
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'student', 'parent')
  async findMySchoolLevels() {
    return await this.mySchoolLevelsService.findMySchoolLevels();
  }

  //create school level subjects
  @Post('subjects')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student')
  async createSchoolLevelSubjects(
    @Body(new ValidationPipe())
    mySchoolLevelSubjectsModel: MySchoolLevelSubjectsModel,
  ) {
    try {
      return await this.mySchoolLevelsService.createSchoolLevelSubjects(
        mySchoolLevelSubjectsModel,
      );
    } catch (error) {
      return {
        message: 'Failed to create school level subjects.',
        error: error.message,
      };
    }
  }

  //find all school level subjects
  @Get('subjects')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'student')
  async findMySchoolLevelSubjects(@Req() req) {
    return await this.mySchoolLevelsService.findMySchoolLevelSubjects(
      req.user.id,
    );
  }

  //find school level wise all subjects
  @Get('level-subjects')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'student', 'tutor')
  async findAllSchoolLevelSubjects() {
    return await this.mySchoolLevelsService.findAllSchoolLevelSubjects();
  }
}

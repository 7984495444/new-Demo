import {
  Controller,
  Get,
  Param,
  BadRequestException,
  UseGuards,
  Request,
  Response,
  Delete,
  Put,
  Body,
  UnprocessableEntityException,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
  Req,
  Query,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../entities';
import { UserService } from './user.service';
import { ChatMessageService } from '../chat-message/chat.service';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleModel, UserUpdateModel } from 'src/dto';
import { UserProfileService } from '../user_profile/user_profile.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly chatService: ChatMessageService,
    private readonly userProfileSerivce: UserProfileService,
  ) {}

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async getProfile(@Request() req): Promise<any> {
    let getStudent;
    if (req.user.role_id.id === 4 && req.user.parent_id !== null) {
      getStudent = await this.userService.getStudentParent(req.user.parent_id);
    } else {
      getStudent = await this.userService.getParentStudent(req.user.id);
    }
    return {
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      active: req.user.active,
      gender: req.user.gender,
      dob: req.user.dob,
      role_id: req.user.role_id,
      email: req.user.email,
      profile_image: req.user.profile_image,
      phone_no: req.user.phone_no,
      student: getStudent,
      parent_id: req.user.parent_id,
      address: req.user.address,
      apartment: req.user.apartment,
      zip: req.user.zip,
      province: req.user.province,
      language: req.user.language,
      social_insurance_number: req.user.social_insurance_number,
      school_level: req.user.school_level,
    };
  }

  // Get role wise user
  @Get('/role/:role_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async getUserByRoleId(
    @Param('role_id') role_id: number,
    @Req() req,
  ): Promise<UserEntity[]> {
    const users = await this.userService.findUserByRoleId(role_id, req.user);

    // const first = [];
    // const second = [];

    const userWithLastChat = [];
    for (let index = 0; index < users.length; index++) {
      const element = users[index];
      const data = await this.chatService.getUserLastMessage({
        user1_id: req.user.id,
        user2_id: element.id,
      });
      // if (
      //   req.user.id !== data[0]?.chat_id['user1_id'] &&
      //   data[0]?.isSeen === 0
      // ) {
      //   first.push({ ...element, chat: data });
      // } else {
      //   second.push({ ...element, chat: data });
      // }
      userWithLastChat.push({
        ...element,
        chat: data,
      });
    }
    // const data1 = first.reverse();
    const usersChat = userWithLastChat.sort((a, b) => {
      const aCreatedAt = a.chat?.[0]?.created_at || 0;
      const bCreatedAt = b.chat?.[0]?.created_at || 0;
      const latestChat = bCreatedAt - aCreatedAt;

      if (latestChat === 0) {
        const aIsSeen = a.chat?.[0]?.isSeen || 0;
        const bIsSeen = b.chat?.[0]?.isSeen || 0;
        return aIsSeen - bIsSeen;
      }
      return latestChat;
    });
    return usersChat;

    // return userWithLastChat; //[...data1, ...second];
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async getUserById(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findUserByIdWithRole(id);
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }

  @Get('search/:name')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async getUserSearch(
    @Param('name') query: string,
    @Req() req,
    @Query('id') id: number,
  ): Promise<any> {
    const users = await this.userService.searchUser(query, req.user, id);

    // const first = [];
    // const second = [];

    const userWithLastChat = [];
    for (let index = 0; index < users.length; index++) {
      const element = users[index];
      const data = await this.chatService.getUserLastMessage({
        user1_id: req.user.id,
        user2_id: element.id,
      });
      // if (
      //   req.user.id !== data[0]?.chat_id['user1_id'] &&
      //   data[0]?.isSeen === 0
      // ) {
      //   first.push({ ...element, chat: data });
      // } else {
      //   second.push({ ...element, chat: data });
      // }
      userWithLastChat.push({
        ...element,
        chat: data,
      });
    }

    // const data1 = first.reverse();

    return userWithLastChat; //[...data1, ...second];
  }

  @Get('profile/image')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async getUserProfile(@Response() res, @Param() id: number): Promise<any> {
    const path = await this.userService.getProfile(id);
    res.sendfile(path);
  }

  @Get('profile-image/:image')
  async getUserProfileImage(
    @Response() res,
    @Param('image') image: string,
  ): Promise<any> {
    const imagePath = await this.userService.getProfileImage(
      image,
      'profile_images',
    );
    if (imagePath) {
      return res.sendFile(imagePath);
    } else {
      return res.status(400).send('Image not found');
    }
  }

  @Delete('/profile/image')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async deleteProfileImage(@Req() req): Promise<any> {
    const userId = req.user.id;
    await this.userService.deleteProfileImage(userId);

    return { message: 'Profile image deleted successfully' };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Put('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  @UseInterceptors(FileInterceptor('profile_image'))
  async updateUser(
    @Req() req,
    @Body(new ValidationPipe()) user: UserUpdateModel,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const userEntity = await this.userService.findById(req.user.id);
    if (!userEntity) {
      throw new UnprocessableEntityException();
    }

    if (user?.password !== undefined) {
      user.password = await this.userService.getHash(user.password);
    } else {
      delete user.password;
    }

    if (user?.school_level && userEntity.school_level !== user?.school_level) {
      await this.userProfileSerivce.updateMatterForUserId(req.user.id);
    }

    let userData;
    if (file) {
      userData = { ...user, profile_image: file.filename };
    } else {
      userData = { ...user };
    }
    const userDetails = await this.userService.update(userEntity, userData);
    return {
      id: userDetails.id,
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      active: userDetails.active,
      gender: userDetails.gender,
      dob: userDetails.dob,
      role_id: userDetails.role_id,
      profile_image: userDetails.profile_image,
      address: userDetails.address,
      language: userDetails.language,
      apartment: userDetails.apartment,
      zip: userDetails.zip,
      province: userDetails.province,
      social_insurance_number: Number(userDetails.social_insurance_number),
      school_level: user.school_level,
    };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async deleteUsers(@Param('id') id: number) {
    const user = await this.userService.destroy(id);
    return user;
  }

  @Put('parent/students')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'parent')
  async updateParentStudents(@Body() studentDetails: any[]) {
    return await this.userService.updateParentStudent(studentDetails);
  }

  //find admin's all tutor details
  @Get('admin/tutors_details/:role_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async getAllAdminTutors(
    @Param('role_id') role_id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') searchQuery?: string,
  ) {
    return await this.userService.getAllAdminTutors(
      role_id,
      page,
      limit,
      searchQuery,
    );
  }

  //find admin's all parent details
  @Get('admin/parent_details/:role_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async getAllAdminParents(
    @Req() req,
    @Param('role_id') role_id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') searchQuery?: string,
  ) {
    return await this.userService.getAllAdminParents(
      req.user.id,
      role_id,
      page,
      limit,
      searchQuery,
    );
  }

  //find student's parent
  @Get('students/parent/:student_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'student', 'parent')
  async findStudentsParent(@Param('student_id') student_id: number) {
    return await this.userService.findStudentsParentDetails(student_id);
  }

  //find parent wise student list
  @Get('parent/student-list')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'parent')
  async findParentStudent(@Req() req) {
    return await this.userService.getParentStudent(req.user.id);
  }

  //create user roles
  @Post('roles')
  async createUserRole(
    @Body(new ValidationPipe())
    roleModel: RoleModel,
  ) {
    return this.userService.createUserRole(roleModel);
  }
}

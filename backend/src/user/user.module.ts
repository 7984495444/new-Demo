import { Module } from '@nestjs/common';
import {
  UserEntity,
  ChatMessageEntity,
  ChatEntity,
  TutorStudentEntity,
  TutorSessionEntity,
  TutorSubjectEntity,
  TutorSessionDraftEntity,
  SubjectEntity,
  CompleteSessionEntity,
  StudentParentFollowUpEntity,
  StudentProgramEntity,
  UserProfileEntity,
  TutorFollowUpEntity,
  StudentSubjectEntity,
  LessonSpaceEntity,
  NotificationEntity,
  ToDoEntity,
  MySchoolLevelsEntity,
  MySchoolLevelSubjectsEntity,
  TutorStudentMatchEntity,
  TutorStudentMatchDraftEntity,
} from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ChatMessageService } from '../chat-message/chat.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleEntity } from '../entities/index';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { TutorSessionService } from 'src/tutor-session/tutor-session.service';
import { TutorStudentService } from 'src/tutor-student/tutor-student.service';
import { timeZoneCovert } from '../utils/convert_timezone';
import { StudentProgramService } from '../student_program/student_program.service';
import { UserProfileService } from '../user_profile/user_profile.service';
import { TutorFollowUpService } from '../tutor-followup/tutor-followup.service';
import { TutorStudentSubjectService } from '../tutor_student_subject/tutor_student_subject.service';
import { LessonSpaceService } from '../lesson_space/lesson_space.service';
import { SubjectsService } from '../subjects/subjects.service';
import { NotificationService } from 'src/notification/notification.service';
import { MySchoolLevelsService } from '../my_school_levels/my_school_levels.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tutorStudentMatch',
    }),
    ConfigModule,
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      ChatMessageEntity,
      ChatEntity,
      TutorStudentEntity,
      TutorSessionEntity,
      TutorSubjectEntity,
      TutorSessionDraftEntity,
      SubjectEntity,
      CompleteSessionEntity,
      StudentParentFollowUpEntity,
      StudentProgramEntity,
      UserProfileEntity,
      TutorFollowUpEntity,
      StudentSubjectEntity,
      LessonSpaceEntity,
      NotificationEntity,
      ToDoEntity,
      MySchoolLevelsEntity,
      MySchoolLevelSubjectsEntity,
      TutorStudentMatchEntity,
      TutorStudentMatchDraftEntity,
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './uploads/profile_images',
          filename: (req, file, callback) => {
            const fileExtName = extname(file.originalname);
            callback(null, `${uuidv4()}${fileExtName}`);
          },
        }),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('jwt'),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ChatMessageService,
    TutorSessionService,
    TutorStudentService,
    timeZoneCovert,
    StudentProgramService,
    UserProfileService,
    TutorFollowUpService,
    TutorStudentSubjectService,
    LessonSpaceService,
    SubjectsService,
    NotificationService,
    MySchoolLevelsService,
  ],
  exports: [
    UserService,
    ChatMessageService,
    TutorSessionService,
    TutorStudentService,
    timeZoneCovert,
    StudentProgramService,
    UserProfileService,
    TutorFollowUpService,
    TutorStudentSubjectService,
    LessonSpaceService,
    SubjectsService,
    NotificationService,
  ],
})
export class UserModule {}

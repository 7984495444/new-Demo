import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RoleEntity,
  UserEntity,
  UserProfileEntity,
  TutorStudentEntity,
  TutorSessionEntity,
  CompleteSessionEntity,
  TutorSubjectEntity,
  TutorSessionDraftEntity,
  SubjectEntity,
  StudentParentFollowUpEntity,
  TutorFollowUpEntity,
  StudentProgramEntity,
  StudentSubjectEntity,
  LessonSpaceEntity,
  NotificationEntity,
  ToDoEntity,
  MySchoolLevelsEntity,
  MySchoolLevelSubjectsEntity,
  TutorStudentMatchEntity,
  TutorStudentMatchDraftEntity,
} from '../entities/index';
import { UserProfileController } from './user_profile.controller';
import { UserProfileService } from './user_profile.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TutorStudentService } from '../tutor-student/tutor-student.service';
import { TutorSessionService } from '../tutor-session/tutor-session.service';
import { TutorFollowUpService } from '../tutor-followup/tutor-followup.service';
import { StudentProgramService } from '../student_program/student_program.service';
import { TutorStudentSubjectService } from '../tutor_student_subject/tutor_student_subject.service';
import { LessonSpaceService } from '../lesson_space/lesson_space.service';
import { SubjectsService } from '../subjects/subjects.service';
import { NotificationService } from '../notification/notification.service';
import { timeZoneCovert } from 'src/utils/convert_timezone';
import { MySchoolLevelsService } from '../my_school_levels/my_school_levels.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tutorStudentMatch',
    }),
    TypeOrmModule.forFeature([
      UserProfileEntity,
      UserEntity,
      RoleEntity,
      TutorStudentEntity,
      TutorSessionEntity,
      CompleteSessionEntity,
      TutorSubjectEntity,
      TutorSessionDraftEntity,
      SubjectEntity,
      StudentParentFollowUpEntity,
      TutorFollowUpEntity,
      StudentProgramEntity,
      StudentSubjectEntity,
      LessonSpaceEntity,
      NotificationEntity,
      ToDoEntity,
      MySchoolLevelsEntity,
      MySchoolLevelSubjectsEntity,
      TutorStudentMatchEntity,
      TutorStudentMatchDraftEntity,
    ]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('jwt'),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserProfileController],
  providers: [
    UserProfileService,
    UserService,
    TutorStudentService,
    TutorSessionService,
    TutorFollowUpService,
    StudentProgramService,
    TutorStudentSubjectService,
    LessonSpaceService,
    SubjectsService,
    NotificationService,
    timeZoneCovert,
    MySchoolLevelsService,
  ],
})
export class UserProfileModule {}

import { Module } from '@nestjs/common';
import { TutorSessionService } from './tutor-session.service';
import { NotificationService } from '../notification/notification.service';
import { TutorSessionController } from './tutor-session.controller';
import { UserModule } from '../user/user.module';
import {
  TutorSessionEntity,
  TutorSessionDraftEntity,
  NotificationEntity,
  SubjectEntity,
  CompleteSessionEntity,
  StudentParentFollowUpEntity,
  TutorFollowUpEntity,
  UserEntity,
  RoleEntity,
  TutorStudentEntity,
  TutorSubjectEntity,
  StudentProgramEntity,
  UserProfileEntity,
  LessonSpaceEntity,
  ToDoEntity,
  MySchoolLevelsEntity,
  MySchoolLevelSubjectsEntity,
  TutorStudentMatchEntity,
  TutorStudentMatchDraftEntity,
} from '../entities/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentParentFollowupService } from 'src/student-parent-followup/student-parent-followup.service';
import { UserService } from 'src/user';
import { JwtService } from '@nestjs/jwt';
import { TutorFollowUpService } from 'src/tutor-followup/tutor-followup.service';
import { TutorStudentService } from 'src/tutor-student/tutor-student.service';
import { timeZoneCovert } from '../utils/convert_timezone';
import { StudentProgramService } from 'src/student_program/student_program.service';
import { LessonSpaceService } from '../lesson_space/lesson_space.service';
import { SubjectsService } from '../subjects/subjects.service';
import { MySchoolLevelsService } from '../my_school_levels/my_school_levels.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TutorSessionEntity,
      TutorSessionDraftEntity,
      NotificationEntity,
      SubjectEntity,
      CompleteSessionEntity,
      StudentParentFollowUpEntity,
      TutorFollowUpEntity,
      UserEntity,
      RoleEntity,
      TutorStudentEntity,
      TutorSubjectEntity,
      StudentProgramEntity,
      UserProfileEntity,
      LessonSpaceEntity,
      ToDoEntity,
      MySchoolLevelsEntity,
      MySchoolLevelSubjectsEntity,
      TutorStudentMatchEntity,
      TutorStudentMatchDraftEntity,
    ]),
    UserModule,
  ],
  controllers: [TutorSessionController],
  providers: [
    TutorSessionService,
    NotificationService,
    StudentParentFollowupService,
    UserService,
    JwtService,
    TutorFollowUpService,
    TutorStudentService,
    timeZoneCovert,
    StudentProgramService,
    LessonSpaceService,
    SubjectsService,
    MySchoolLevelsService,
  ],
})
export class TutorSessionModule {}

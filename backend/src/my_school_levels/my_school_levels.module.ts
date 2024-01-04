import { Module } from '@nestjs/common';
import { MySchoolLevelsController } from './my_school_levels.controller';
import { MySchoolLevelsService } from './my_school_levels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MySchoolLevelsEntity,
  MySchoolLevelSubjectsEntity,
  UserEntity,
  RoleEntity,
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
  TutorStudentMatchEntity,
  TutorStudentMatchDraftEntity,
} from '../entities/index';
import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { TutorStudentService } from 'src/tutor-student/tutor-student.service';
import { UserProfileService } from 'src/user_profile/user_profile.service';
import { TutorSessionService } from 'src/tutor-session/tutor-session.service';
import { TutorFollowUpService } from 'src/tutor-followup/tutor-followup.service';
import { StudentProgramService } from 'src/student_program/student_program.service';
import { TutorStudentSubjectService } from 'src/tutor_student_subject/tutor_student_subject.service';
import { LessonSpaceService } from 'src/lesson_space/lesson_space.service';
import { NotificationService } from 'src/notification/notification.service';
import { SubjectsService } from 'src/subjects/subjects.service';
import { BullModule } from '@nestjs/bull';
import { timeZoneCovert } from 'src/utils/convert_timezone';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tutorStudentMatch',
    }),
    TypeOrmModule.forFeature([
      MySchoolLevelsEntity,
      MySchoolLevelSubjectsEntity,
      UserEntity,
      RoleEntity,
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
      TutorStudentMatchEntity,
      TutorStudentMatchDraftEntity,
    ]),
  ],
  controllers: [MySchoolLevelsController],
  providers: [
    MySchoolLevelsService,
    UserService,
    JwtService,
    TutorStudentService,
    UserProfileService,
    TutorSessionService,
    TutorFollowUpService,
    StudentProgramService,
    TutorStudentSubjectService,
    LessonSpaceService,
    NotificationService,
    SubjectsService,
    timeZoneCovert,
  ],
})
export class MySchoolLevelsModule {}

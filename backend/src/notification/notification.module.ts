import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  NotificationEntity,
  ToDoEntity,
  TutorSessionEntity,
  TutorSubjectEntity,
  TutorSessionDraftEntity,
  SubjectEntity,
  CompleteSessionEntity,
  StudentParentFollowUpEntity,
  StudentProgramEntity,
  UserEntity,
  RoleEntity,
  UserProfileEntity,
  LessonSpaceEntity,
  TutorStudentEntity,
  TutorFollowUpEntity,
  StudentSubjectEntity,
  MySchoolLevelsEntity,
  MySchoolLevelSubjectsEntity,
  TutorStudentMatchEntity,
  TutorStudentMatchDraftEntity,
} from '../entities/index';
import { TutorSessionService } from '../tutor-session/tutor-session.service';
import { StudentProgramService } from '../student_program/student_program.service';
import { UserService } from '../user/user.service';
import { LessonSpaceService } from '../lesson_space/lesson_space.service';
import { JwtService } from '@nestjs/jwt';
import { TutorStudentService } from 'src/tutor-student/tutor-student.service';
import { UserProfileService } from 'src/user_profile/user_profile.service';
import { TutorFollowUpService } from 'src/tutor-followup/tutor-followup.service';
import { SubjectsService } from 'src/subjects/subjects.service';
import { TutorStudentSubjectService } from '../tutor_student_subject/tutor_student_subject.service';
import { timeZoneCovert } from 'src/utils/convert_timezone';
import { MySchoolLevelsService } from '../my_school_levels/my_school_levels.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tutorStudentMatch',
    }),
    TypeOrmModule.forFeature([
      NotificationEntity,
      ToDoEntity,
      TutorSessionEntity,
      TutorSubjectEntity,
      TutorSessionDraftEntity,
      SubjectEntity,
      CompleteSessionEntity,
      StudentParentFollowUpEntity,
      StudentProgramEntity,
      UserEntity,
      RoleEntity,
      UserProfileEntity,
      LessonSpaceEntity,
      TutorStudentEntity,
      TutorFollowUpEntity,
      StudentSubjectEntity,
      MySchoolLevelsEntity,
      MySchoolLevelSubjectsEntity,
      TutorStudentMatchEntity,
      TutorStudentMatchDraftEntity,
    ]),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    TutorSessionService,
    StudentProgramService,
    UserService,
    LessonSpaceService,
    JwtService,
    TutorStudentService,
    UserProfileService,
    TutorFollowUpService,
    SubjectsService,
    TutorStudentSubjectService,
    timeZoneCovert,
    MySchoolLevelsService,
  ],
})
export class NotificationModule {}

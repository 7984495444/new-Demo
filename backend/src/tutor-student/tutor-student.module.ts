import { Module } from '@nestjs/common';
import { TutorStudentService } from './tutor-student.service';
import { TutorStudentController } from './tutor-student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CompleteSessionEntity,
  RoleEntity,
  StudentParentFollowUpEntity,
  SubjectEntity,
  TutorSessionDraftEntity,
  TutorSessionEntity,
  TutorStudentEntity,
  TutorSubjectEntity,
  UserEntity,
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
} from '../entities/index';
import { UserService } from 'src/user';
import { JwtService } from '@nestjs/jwt';
import { TutorSessionService } from 'src/tutor-session/tutor-session.service';
import { timeZoneCovert } from '../utils/convert_timezone';
import { StudentProgramService } from 'src/student_program/student_program.service';
import { UserProfileService } from '../user_profile/user_profile.service';
import { TutorFollowUpService } from '../tutor-followup/tutor-followup.service';
import { TutorStudentSubjectService } from '../tutor_student_subject/tutor_student_subject.service';
import { LessonSpaceService } from '../lesson_space/lesson_space.service';
import { SubjectsService } from '../subjects/subjects.service';
import { NotificationService } from '../notification/notification.service';
import { MySchoolLevelsService } from '../my_school_levels/my_school_levels.service';
import { BullModule } from '@nestjs/bull';
import { TutorStudentProcessor } from './tutor-student.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tutorStudentMatch',
    }),
    TypeOrmModule.forFeature([
      TutorSessionEntity,
      CompleteSessionEntity,
      StudentParentFollowUpEntity,
      TutorStudentEntity,
      UserEntity,
      RoleEntity,
      TutorSessionDraftEntity,
      SubjectEntity,
      TutorSubjectEntity,
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
  ],
  controllers: [TutorStudentController],
  providers: [
    TutorStudentService,
    UserService,
    JwtService,
    TutorSessionService,
    TutorSessionDraftEntity,
    SubjectEntity,
    timeZoneCovert,
    StudentProgramService,
    UserProfileService,
    TutorFollowUpService,
    TutorStudentSubjectService,
    LessonSpaceService,
    SubjectsService,
    NotificationService,
    MySchoolLevelsService,
    TutorStudentProcessor,
  ],
})
export class TutorStudentModule {}

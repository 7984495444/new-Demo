import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorFollowUpController } from './tutor-followup.controller';
import { TutorFollowUpService } from './tutor-followup.service';
import {
  StudentParentFollowUpEntity,
  TutorFollowUpEntity,
  TutorSessionEntity,
  TutorStudentEntity,
  CompleteSessionEntity,
  RoleEntity,
  TutorSessionDraftEntity,
  SubjectEntity,
  TutorSubjectEntity,
  UserEntity,
  StudentProgramEntity,
  StudentSubjectEntity,
  LessonSpaceEntity,
  MySchoolLevelsEntity,
  MySchoolLevelSubjectsEntity,
  TutorStudentMatchEntity,
  TutorStudentMatchDraftEntity,
} from 'src/entities';
import { StudentParentFollowupService } from 'src/student-parent-followup/student-parent-followup.service';
import { UserModule } from 'src/user';
import { TutorSessionService } from 'src/tutor-session/tutor-session.service';
import { TutorStudentService } from 'src/tutor-student/tutor-student.service';
import { timeZoneCovert } from '../utils/convert_timezone';
import { StudentProgramService } from 'src/student_program/student_program.service';
import { TutorStudentSubjectService } from '../tutor_student_subject/tutor_student_subject.service';
import { LessonSpaceService } from '../lesson_space/lesson_space.service';
import { SubjectsService } from '../subjects/subjects.service';
import { MySchoolLevelsService } from '../my_school_levels/my_school_levels.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      TutorFollowUpEntity,
      StudentParentFollowUpEntity,
      TutorSessionEntity,
      TutorStudentEntity,
      CompleteSessionEntity,
      RoleEntity,
      TutorSessionDraftEntity,
      SubjectEntity,
      TutorSubjectEntity,
      UserEntity,
      StudentProgramEntity,
      StudentSubjectEntity,
      LessonSpaceEntity,
      MySchoolLevelsEntity,
      MySchoolLevelSubjectsEntity,
      TutorStudentMatchEntity,
      TutorStudentMatchDraftEntity,
    ]),
  ],
  controllers: [TutorFollowUpController],
  providers: [
    TutorFollowUpService,
    StudentParentFollowupService,
    TutorSessionService,
    TutorSessionDraftEntity,
    SubjectEntity,
    TutorStudentService,
    timeZoneCovert,
    StudentProgramService,
    TutorStudentSubjectService,
    LessonSpaceService,
    SubjectsService,
    MySchoolLevelsService,
  ],
})
export class TutorFollowUpModule {}

import { Module } from '@nestjs/common';
import { CompleteSessionService } from './complete-session.service';
import { TutorSessionService } from '../tutor-session/tutor-session.service';
import { CompleteSessionController } from './complete-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CompleteSessionEntity,
  TutorSessionEntity,
  TutorSessionDraftEntity,
  SubjectEntity,
  StudentParentFollowUpEntity,
  TutorFollowUpEntity,
  UserEntity,
  RoleEntity,
  TutorStudentEntity,
  TutorSubjectEntity,
  StudentProgramEntity,
  UserProfileEntity,
  StudentSubjectEntity,
  LessonSpaceEntity,
  NotificationEntity,
  ToDoEntity,
  MySchoolLevelsEntity,
  MySchoolLevelSubjectsEntity,
  TutorStudentMatchEntity,
  TutorStudentMatchDraftEntity,
} from '../entities/index';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { StudentParentFollowupService } from 'src/student-parent-followup/student-parent-followup.service';
import { UserService } from 'src/user';
import { JwtService } from '@nestjs/jwt';
import { TutorFollowUpService } from 'src/tutor-followup/tutor-followup.service';
import { TutorStudentService } from 'src/tutor-student/tutor-student.service';
import { timeZoneCovert } from '../utils/convert_timezone';
import { StudentProgramService } from 'src/student_program/student_program.service';
import { UserProfileService } from 'src/user_profile/user_profile.service';
import { TutorStudentSubjectService } from '../tutor_student_subject/tutor_student_subject.service';
import { LessonSpaceService } from '../lesson_space/lesson_space.service';
import { SubjectsService } from '../subjects/subjects.service';
import { NotificationService } from '../notification/notification.service';
import { MySchoolLevelsService } from '../my_school_levels/my_school_levels.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tutorStudentMatch',
    }),
    TypeOrmModule.forFeature([
      CompleteSessionEntity,
      TutorSessionEntity,
      TutorSessionDraftEntity,
      SubjectEntity,
      StudentParentFollowUpEntity,
      TutorFollowUpEntity,
      UserEntity,
      RoleEntity,
      TutorStudentEntity,
      TutorSubjectEntity,
      StudentProgramEntity,
      UserProfileEntity,
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
        limits: {
          fileSize: 20 * 1024 * 1024, // 20MB in bytes
        },
        storage: diskStorage({
          destination: './uploads/complete_documents',
          filename: (req, file, callback) => {
            const fileExtName = extname(file.originalname);
            callback(null, `${uuidv4()}${fileExtName}`);
          },
        }),
      }),
    }),
  ],
  controllers: [CompleteSessionController],
  providers: [
    CompleteSessionService,
    TutorSessionService,
    StudentParentFollowupService,
    UserService,
    JwtService,
    TutorFollowUpService,
    TutorStudentService,
    timeZoneCovert,
    StudentProgramService,
    UserProfileService,
    TutorStudentSubjectService,
    LessonSpaceService,
    SubjectsService,
    NotificationService,
    MySchoolLevelsService,
  ],
})
export class CompleteSessionModule {}

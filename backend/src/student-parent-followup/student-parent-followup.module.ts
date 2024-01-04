import { Module } from '@nestjs/common';
import { StudentParentFollowupController } from './student-parent-followup.controller';
import { StudentParentFollowupService } from './student-parent-followup.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  StudentParentFollowUpEntity,
  TutorFollowUpEntity,
  CompleteSessionEntity,
  TutorSessionEntity,
  UserEntity,
  RoleEntity,
  TutorSessionDraftEntity,
  SubjectEntity,
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
} from 'src/entities';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TutorSessionService } from 'src/tutor-session/tutor-session.service';
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
      StudentParentFollowUpEntity,
      TutorFollowUpEntity,
      TutorSessionEntity,
      CompleteSessionEntity,
      UserEntity,
      RoleEntity,
      TutorSessionService,
      TutorSessionDraftEntity,
      SubjectEntity,
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
  controllers: [StudentParentFollowupController],
  providers: [
    StudentParentFollowupService,
    UserService,
    TutorSessionService,
    TutorSessionDraftEntity,
    SubjectEntity,
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
export class StudentParentFollowupModule {}

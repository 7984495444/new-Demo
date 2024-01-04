import { Module } from '@nestjs/common';
import { LessonSpaceController } from './lesson_space.controller';
import { LessonSpaceService } from './lesson_space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  LessonSpaceEntity,
  UserEntity,
  RoleEntity,
  UserProfileEntity,
  SubjectEntity,
  TutorSessionEntity,
  TutorSubjectEntity,
  TutorSessionDraftEntity,
  CompleteSessionEntity,
  StudentParentFollowUpEntity,
  NotificationEntity,
  ToDoEntity,
} from '../entities/index';
import { UserModule, UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { SubjectsService } from '../subjects/subjects.service';
import { TutorSessionService } from '../tutor-session/tutor-session.service';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      LessonSpaceEntity,
      UserEntity,
      RoleEntity,
      UserProfileEntity,
      SubjectEntity,
      TutorSessionEntity,
      TutorSubjectEntity,
      TutorSessionDraftEntity,
      CompleteSessionEntity,
      StudentParentFollowUpEntity,
      NotificationEntity,
      ToDoEntity,
    ]),
  ],
  controllers: [LessonSpaceController],
  providers: [
    LessonSpaceService,
    UserService,
    JwtService,
    SubjectsService,
    TutorSessionService,
    NotificationService,
  ],
})
export class LessonSpaceModule {}

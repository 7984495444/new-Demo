import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth';
import { UserModule } from './user';
import { TutorSessionModule } from './tutor-session/tutor-session.module';
import { TutorStudentModule } from './tutor-student/tutor-student.module';
import { TutorDocumentModule } from './tutor-document/tutor-document.module';
import { StudentAttendanceModule } from './student-attendance/student-attendance.module';
import { NotificationSettingModule } from './notificationSetting/notification_setting.module';
import configuration from './config/config';
import { ChatMessageModule } from './chat-message/chat.module';
import { SubjectsModule } from './subjects/subjects.module';
import { StripeCardModule } from './stripeCard/stripe_card.module';
import { CompleteSessionModule } from './complete-session/complete-session.module';
import { PaymentDeductionModule } from './payment_deduction/payment_deduction.module';
import { TutorFollowUpModule } from './tutor-followup/tutor-followup.module';
import { StudentParentFollowupModule } from './student-parent-followup/student-parent-followup.module';
import { PlateformEvaluationModule } from './plateform-evaluation/plateform-evaluation.module';
import { NotificationModule } from './notification/notification.module';
import { StudentProgramModule } from './student_program/student_program.module';
import { TutorStudentSubjectModule } from './tutor_student_subject/tutor_student_subject.module';
import { UserProfileModule } from './user_profile/user_profile.module';
import { LessonSpaceModule } from './lesson_space/lesson_space.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MySchoolLevelsModule } from './my_school_levels/my_school_levels.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    ...(process.env.NEXT_PUBLIC_DEVELOPMENT_TYPE === 'local'
      ? [
          BullModule.forRoot({
            redis: {
              host: process.env.DB_HOST,
              port: process.env.REDIS_SERVER_PORT as unknown as number,
            },
          }),
        ]
      : []),
    ChatMessageModule,
    UserModule,
    AuthModule,
    TutorSessionModule,
    TutorStudentModule,
    TutorDocumentModule,
    StudentAttendanceModule,
    NotificationSettingModule,
    SubjectsModule,
    StripeCardModule,
    CompleteSessionModule,
    PaymentDeductionModule,
    TutorFollowUpModule,
    StudentParentFollowupModule,
    PlateformEvaluationModule,
    NotificationModule,
    StudentProgramModule,
    TutorStudentSubjectModule,
    UserProfileModule,
    LessonSpaceModule,
    MySchoolLevelsModule,
  ],
})
export class AppModule {}

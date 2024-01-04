import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorStudentSubjectController } from './tutor_student_subject.controller';
import { TutorStudentSubjectService } from './tutor_student_subject.service';
import { TutorSubjectEntity, StudentSubjectEntity } from '../entities/index';

@Module({
  imports: [
    TypeOrmModule.forFeature([TutorSubjectEntity, StudentSubjectEntity]),
  ],
  controllers: [TutorStudentSubjectController],
  providers: [TutorStudentSubjectService],
})
export class TutorStudentSubjectModule {}

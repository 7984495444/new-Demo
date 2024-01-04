import { Module } from '@nestjs/common';
import { StudentAttendanceService } from './student-attendance.service';
import { StudentAttendanceController } from './student-attendance.controller';
import { StudentAttendanceEntity } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StudentAttendanceEntity])],
  controllers: [StudentAttendanceController],
  providers: [StudentAttendanceService],
})
export class StudentAttendanceModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentProgramController } from './student_program.controller';
import { StudentProgramService } from './student_program.service';
import { StudentProgramEntity } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([StudentProgramEntity])],
  controllers: [StudentProgramController],
  providers: [StudentProgramService],
})
export class StudentProgramModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentAttendanceModel } from '../dto/index';
import { StudentAttendanceEntity as StudentAttendance } from '../entities/index';

@Injectable()
export class StudentAttendanceService {
  constructor(
    @InjectRepository(StudentAttendance)
    private readonly studentAttendanceRepository: Repository<StudentAttendance>,
  ) {}

  async create(studentAttendanceModel: StudentAttendanceModel): Promise<any> {
    return await this.studentAttendanceRepository.save(studentAttendanceModel);
  }

  async findAll(): Promise<StudentAttendance[]> {
    return await this.studentAttendanceRepository.find();
  }

  async findOne(id: number): Promise<StudentAttendance> {
    return await this.studentAttendanceRepository.findOne({
      where: { id },
    });
  }
  async update(
    id: number,
    studentAttendanceModel: StudentAttendanceModel,
  ): Promise<any> {
    return await this.studentAttendanceRepository.update(id, {
      ...studentAttendanceModel,
    });
  }

  async remove(id: number): Promise<any> {
    return await this.studentAttendanceRepository.delete(id);
  }
}

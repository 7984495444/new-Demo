import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentProgramEntity as StudentProgram } from 'src/entities';
import { StudentProgramModel } from '../dto/index';

@Injectable()
export class StudentProgramService {
  constructor(
    @InjectRepository(StudentProgram)
    private readonly StudentProgramRepository: Repository<StudentProgram>,
  ) {}

  async create(
    id: number,
    studentProgramModel: StudentProgramModel,
  ): Promise<StudentProgram> {
    studentProgramModel['tutor'] = id;
    return await this.StudentProgramRepository.save(studentProgramModel);
  }

  async findOne(id: number): Promise<StudentProgram> {
    return await this.StudentProgramRepository.createQueryBuilder(
      'student_program',
    )
      .leftJoin('student_program.student', 'student')
      .leftJoin('student_program.tutor', 'tutor')
      .leftJoin('student_program.subject', 'subject')
      .select([
        'student_program',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.profile_image',
        'student.email',
        'tutor.id',
        'tutor.first_name',
        'tutor.last_name',
        'tutor.profile_image',
        'tutor.email',
        'subject.id',
        'subject.name_en',
        'subject.name_fr',
      ])
      .where('student_program.id = :id', { id })
      .getOne();
  }

  async findAll(): Promise<StudentProgram[]> {
    return await this.StudentProgramRepository.createQueryBuilder(
      'student_program',
    )
      .leftJoin('student_program.student', 'student')
      .leftJoin('student_program.tutor', 'tutor')
      .leftJoin('student_program.subject', 'subject')
      .select([
        'student_program',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.profile_image',
        'student.email',
        'tutor.id',
        'tutor.first_name',
        'tutor.last_name',
        'tutor.profile_image',
        'tutor.email',
        'subject.id',
        'subject.name_en',
        'subject.name_fr',
      ])
      .getMany();
  }

  async update(
    id: number,
    studentProgramModel: StudentProgramModel,
  ): Promise<any> {
    return await this.StudentProgramRepository.update(id, studentProgramModel);
  }

  async remove(id: number): Promise<any> {
    return await this.StudentProgramRepository.delete(id);
  }

  async findStudentTotalSessions(
    student_id: number,
    tutor_id: number,
    subject_id: number,
  ): Promise<any> {
    const session = await this.StudentProgramRepository.createQueryBuilder(
      'student_session',
    )
      .leftJoin('student_session.student', 'student')
      .leftJoin('student_session.tutor', 'tutor')
      .leftJoin('student_session.subject', 'subject')
      .select(['student_session'])
      .where(
        'student_session.student = :student_id AND student_session.tutor = :tutor_id AND student_session.subject = :subject_id',
        { student_id: student_id, tutor_id: tutor_id, subject_id: subject_id },
      )
      .getOne();
    if (!session) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Please update the program count',
        count: 0,
      };
    }
    return {
      count: session?.total_session,
    };
  }
}

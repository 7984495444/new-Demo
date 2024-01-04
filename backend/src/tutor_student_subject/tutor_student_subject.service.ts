import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import {
  TutorSubjectEntity as TutorSubject,
  StudentSubjectEntity as StudentSubject,
  TutorStudentEntity as TutorStudent,
} from '../entities/index';
import { TutorSubjectModel, StudentSubjectModel } from '../dto/index';

@Injectable()
export class TutorStudentSubjectService {
  constructor(
    @InjectRepository(TutorSubject)
    private readonly TutorSubjectRepository: Repository<TutorSubject>,
    @InjectRepository(StudentSubject)
    private readonly StudentSubjectRepository: Repository<StudentSubject>,
  ) {}

  //create tutor subject
  async createTutorSubject(
    tutorSubjectModel: TutorSubjectModel,
  ): Promise<TutorSubject> {
    return await this.TutorSubjectRepository.save(tutorSubjectModel);
  }

  //create student subject
  async createStudentSubject(
    studentSubjectModel: StudentSubjectModel,
  ): Promise<StudentSubject> {
    return await this.StudentSubjectRepository.save(studentSubjectModel);
  }

  //find tutor subject
  async findTutorSubject(
    id: number,
    subject_id: number,
  ): Promise<TutorSubject> {
    return await this.TutorSubjectRepository.createQueryBuilder('ts')
      .leftJoin('ts.tutor', 'tutor')
      .leftJoin('ts.subject', 'subject')
      .select([
        'ts.id',
        'tutor.id',
        'tutor.email',
        'tutor.first_name',
        'tutor.last_name',
        'tutor.profile_image',
        'subject',
      ])
      .where('ts.tutor = :id AND ts.subject.id = :subject_id', {
        id,
        subject_id,
      })
      .getOne();
  }

  //find subject which is not tutor subject
  async findNotTutorSubject(id: number, subject_id: number[]): Promise<any> {
    const subject = await this.TutorSubjectRepository.createQueryBuilder('ts')
      .leftJoin('ts.subject', 'subject')
      .select(['subject.id AS id'])
      .where({
        tutor: id,
        subject: Not(In(subject_id)),
      })
      .getRawMany();
    const subject_ids = subject.map((subject) => subject.id);
    return subject_ids;
  }

  //delete tutor subjects
  async deleteTutorSubject(
    tutor_id: number,
    subjectIds: number[],
  ): Promise<void> {
    await this.TutorSubjectRepository.createQueryBuilder()
      .delete()
      .from(TutorSubject)
      .where('tutor_id = :tutor_id AND subject_id IN (:...subjectIds)', {
        tutor_id,
        subjectIds,
      })
      .execute();
  }

  //find student subject
  async findStudentSubject(
    id: number,
    subject_id: number,
  ): Promise<StudentSubject> {
    return await this.StudentSubjectRepository.createQueryBuilder('ss')
      .leftJoin('ss.student', 'student')
      .leftJoin('ss.subject', 'subject')
      .select([
        'ss.id',
        'student.id',
        'student.email',
        'student.first_name',
        'student.last_name',
        'student.profile_image',
        'subject',
      ])
      .where('ss.student = :id AND ss.subject.id = :subject_id', {
        id,
        subject_id,
      })
      .getOne();
  }

  //find subject which is not updated student subject
  async findNotStudentSubject(id: number, subject_id: number[]): Promise<any> {
    const subject = await this.StudentSubjectRepository.createQueryBuilder('ss')
      .leftJoin('ss.subject', 'subject')
      .select(['subject.id AS id'])
      .where({
        student: id,
        subject: Not(In(subject_id)),
      })
      .getRawMany();
    const subject_ids = subject.map((subject) => subject.id);
    return subject_ids;
  }

  //delete student subjects
  async deleteStudentSubject(
    student_id: number,
    subjectIds: number[],
  ): Promise<void> {
    await this.StudentSubjectRepository.createQueryBuilder()
      .delete()
      .from(StudentSubject)
      .where('student_id = :student_id AND subject_id IN (:...subjectIds)', {
        student_id,
        subjectIds,
      })
      .execute();
  }

  //add multiple tutor subjects
  async addTutorSubject(user_id: number, subjectIds: number[]): Promise<any> {
    const promises = subjectIds.map(async (subjectId) => {
      const noTutorSubject = await this.findNotTutorSubject(
        user_id,
        subjectIds,
      );
      if (noTutorSubject.length > 0) {
        await this.deleteTutorSubject(user_id, noTutorSubject);
      }

      const existingTutorSubject = await this.findTutorSubject(
        user_id,
        subjectId,
      );
      if (!existingTutorSubject) {
        const tutorSubject = this.TutorSubjectRepository.create({
          tutor: user_id,
          subject: subjectId,
        });
        await this.TutorSubjectRepository.save(tutorSubject);
      }
    });
    await Promise.all(promises);
  }

  //add multiple student subjects
  async addStudentSubject(user_id: number, subjectIds: number[]): Promise<any> {
    const noStudentSubject = await this.findNotStudentSubject(
      user_id,
      subjectIds,
    );
    if (noStudentSubject.length > 0) {
      await this.deleteStudentSubject(user_id, noStudentSubject);
    }

    const promises = subjectIds.map(async (subjectId) => {
      const existingStudentSubject = await this.findStudentSubject(
        user_id,
        subjectId,
      );
      if (!existingStudentSubject) {
        const studentSubject = this.StudentSubjectRepository.create({
          student: user_id,
          subject: subjectId,
        });
        await this.StudentSubjectRepository.save(studentSubject);
      }
    });
    await Promise.all(promises);
  }

  //find student all subjects
  async findStudentAllSubject(id: number): Promise<StudentSubject[]> {
    return await this.StudentSubjectRepository.createQueryBuilder('ss')
      .leftJoin('ss.subject', 'subject')
      .leftJoin('ss.student', 'student')
      .innerJoinAndMapMany(
        'ss.tutor_student',
        TutorStudent,
        'tus', //student_subject = ss
        'tus.student_id = :id AND ss.subject_id = tus.subject_id AND tus.confirmation = true',
        { id },
      )
      .leftJoin('tus.subject', 'tus_subject')
      .select([
        'student.id AS student_id',
        'student.first_name AS student_first_name',
        'student.last_name AS student_last_name',
        'student.profile_image AS student_profile_image',
        'student.school_level AS student_school_level',
        'tus_subject.id AS id',
        'tus_subject.name_en AS subject_name_en',
        'tus_subject.name_fr AS subject_name_fr ',
        'tus_subject.created_at AS created_at',
        'tus_subject.updated_at AS updated_at',
      ])
      .where('ss.student = :id', {
        id,
      })
      .getRawMany();
  }

  //find tutor & student common subject
  async findTutorStudentSubject(
    tutor_id: number,
    student_id: number,
  ): Promise<any> {
    return await this.TutorSubjectRepository.createQueryBuilder('ts')
      .leftJoin('ts.tutor', 'tutor')
      .leftJoin('ts.subject', 'subject')
      .innerJoinAndMapMany(
        'tus.student_subject',
        StudentSubject,
        'ss', //student_subject = ss
        'ss.student_id = :student_id AND ss.subject_id = ts.subject_id',
        { student_id },
      )
      .select([
        'subject.id AS subject_id',
        'subject.name_en AS subject_name_en',
        'subject.name_fr AS subject_name_fr',
      ])
      .where('ts.tutor = :tutor_id', {
        tutor_id,
      })
      .getRawMany();
  }
}

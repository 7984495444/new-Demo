import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  StudentParentFollowUpEntity,
  TutorFollowUpEntity,
  TutorSubjectEntity,
  StudentSubjectEntity,
  TutorStudentEntity,
} from 'src/entities';
import { UserService } from '../user/user.service';
import { StudentParentFollowUpModel as StudentParentFollowUp } from '../dto/index';
import { Repository } from 'typeorm';
import { TutorSessionService } from 'src/tutor-session/tutor-session.service';
// import { TutorFollowUpService } from 'src/tutor-followup/tutor-followup.service';
import { TutorStudentService } from 'src/tutor-student/tutor-student.service';
import { TutorFollowUpService } from 'src/tutor-followup/tutor-followup.service';
import { StudentProgramService } from 'src/student_program/student_program.service';

@Injectable()
export class StudentParentFollowupService {
  constructor(
    @InjectRepository(StudentParentFollowUpEntity)
    private readonly StudentParentFollowUpRepository: Repository<StudentParentFollowUpEntity>,
    // @InjectRepository(TutorFollowUpEntity)
    // private readonly TutorFollowUpRepository: Repository<TutorFollowUpEntity>,
    @InjectRepository(TutorStudentEntity)
    private readonly TutorStudentRepository: Repository<TutorStudentEntity>,
    private readonly userService: UserService,
    private readonly tutorSessionService: TutorSessionService,
    private readonly tutorFollowUpService: TutorFollowUpService,
    private readonly tutorStudentService: TutorStudentService,
    private readonly studentProgramService: StudentProgramService,
  ) {}

  //create student-parent followup
  async create(
    studentParentFollowUp: StudentParentFollowUp,
    id: number,
  ): Promise<StudentParentFollowUpEntity> {
    studentParentFollowUp['user'] = id;
    const followup = this.StudentParentFollowUpRepository.create(
      studentParentFollowUp,
    );
    followup.star_rating = Number(followup.rating.toFixed(2));

    // if (studentParentFollowUp?.parent) {
    //   const followupData = await this.tutorFollowUpService.getParentFollowup(
    //     studentParentFollowUp?.tutor,
    //     studentParentFollowUp?.parent,
    //     studentParentFollowUp?.student,
    //     studentParentFollowUp?.subject,
    //   );

    //   if (followupData.length === 0) {
    //     return this.StudentParentFollowUpRepository.save(followup);
    //   } else {
    //     followup.assessment_accessible =
    //       followupData[followupData.length - 1]?.assessment_accessible;

    //     return this.StudentParentFollowUpRepository.save(followup);
    //   }
    // } else {
    return this.StudentParentFollowUpRepository.save(followup);
    // }
  }

  //get all followups
  async findAll(): Promise<any> {
    return await this.StudentParentFollowUpRepository.createQueryBuilder(
      'followup',
    )
      .select([
        'followup',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'parent.id',
        'parent.first_name',
        'parent.last_name',
        'parent.email',
        'tutor.id',
        'tutor.first_name',
        'tutor.last_name',
        'tutor.email',
      ])
      .leftJoin('followup.tutor', 'tutor')
      .leftJoin('followup.student', 'student')
      .leftJoin('followup.parent', 'parent')
      .getMany();
  }

  //get particular student-parent-followup by id
  async findStudentById(user_id: number): Promise<any> {
    const user = await this.StudentParentFollowUpRepository.createQueryBuilder(
      'followup',
    )
      .select([
        'followup',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.profile_image',
        'parent.id',
        'parent.first_name',
        'parent.last_name',
        'parent.profile_image',
        'tutor.id',
        'tutor.first_name',
        'tutor.last_name',
      ])
      .leftJoin('followup.tutor', 'tutor')
      .leftJoin('followup.student', 'student')
      .leftJoin('followup.parent', 'parent')
      .where('followup.id = :user_id', { user_id })
      .getOne();
    if (!user) {
      throw new BadRequestException(`Student with ID ${user_id} not found`);
    }
    // const sessionData = [];
    // const sessions = await this.tutorSessionService.findSessions(
    //   student_id,
    //   student.user['id'],
    // );

    // const session_ids = [];
    // const sessionSubjectNames = new Set();

    // for (let j = 0; j < sessions.length; j++) {
    //   session_ids.push(sessions[j].id);
    //   const subjectName = sessions[j].session_subject_id?.['subject_name'];
    //   if (subjectName) {
    //     sessionSubjectNames.add(subjectName);
    //   }
    // }
    // const confirm_sessions =
    //   await this.tutorStudentService.getAllConfirmSessions(session_ids);

    // const last_date_of_followups = await this.getLastFollowup();

    // sessionData.push({
    //   ...student,
    //   first_session_date: sessions[0]?.session_date,
    //   subject: Array.from(sessionSubjectNames),
    //   // no_of_sessions: `${confirm_sessions.length + '/' + sessions.length}`,
    //   confirm_sessions: confirm_sessions.length,
    //   total_session: sessions.length,
    //   date_of_assessment: last_date_of_followups.created_at,
    // });
    return user;
  }

  //first tab
  // get particular student with additional details
  // async findStudentDetails(student_id: number): Promise<any> {
  //   return await this.StudentParentFollowUpRepository.createQueryBuilder(
  //     'followup',
  //   )
  //     .select([
  //       'followup',
  //       'user.id',
  //       'user.first_name',
  //       'user.last_name',
  //       'user.email',
  //       'user.profile_image',
  //       'tutor.id',
  //       'tutor.first_name',
  //       'tutor.last_name',
  //     ])
  //     .leftJoin('followup.tutor', 'tutor')
  //     .leftJoin('followup.user', 'user')
  //     .where('followup.user = :student_id', { student_id })
  //     .getMany();
  //
  // const sessionData = [];
  // for (let i = 0; i < student.length; i++) {
  //   const sessions = await this.tutorSessionService.findSessions(
  //     student_id,
  //     student[i].user['id'],
  //   );

  //   const session_ids = [];
  //   for (let j = 0; j < sessions.length; j++) {
  //     session_ids.push(sessions[j].id);
  //   }
  //   const confirm_sessions =
  //     await this.tutorStudentService.getAllConfirmSessions(session_ids);

  //   const last_date_of_followups = await this.getLastFollowup();

  //   sessionData.push({
  //     followup: student,
  //     id: student[i]?.user['id'],
  //     first_name: student[i]?.user['first_name'],
  //     last_name: student[i]?.user['last_name'],
  //     email: student[i]?.user['email'],
  //     profile_image: student[i]?.user['profile_image'],
  //     first_session_date: sessions[0]?.session_date,
  //     confirm_sessions: confirm_sessions?.length,
  //     total_session: sessions?.length,
  //     date_of_assessment: last_date_of_followups?.created_at,
  //     subject: sessions[i]?.session_subject_id['subject_name'],
  //   });
  //   return sessionData;
  // }
  // }

  //get student subject details
  async getStudentSubjectDetails(student_id: number): Promise<any> {
    return await this.TutorStudentRepository.createQueryBuilder('tus')
      .leftJoin('tus.user', 'user')
      .leftJoin('tus.student', 'student')
      .leftJoin('tus.subject', 'ss_subject')
      // .innerJoinAndMapMany(
      //   'tus.student_subject',
      //   StudentSubjectEntity,
      //   'ss', //student_subject = ss
      //   'ss.student_id = :student_id',
      //   { student_id },
      // )
      // .leftJoin('ss.subject', 'ss_subject')
      .innerJoinAndMapMany(
        'followup.tutor_subject',
        TutorSubjectEntity,
        'ts', //tutor_subject = ts
        'tus.subject_id = ts.subject_id AND tus.user_id = ts.tutor_id',
      )
      .leftJoin('ts.tutor', 'ts_tutor')
      .leftJoin('ts.subject', 'ts_subject')
      .select([
        'student.id AS student_id',
        'student.first_name AS student_first_name',
        'student.last_name AS student_last_name',
        'student.profile_image AS student_profile_image',
        'ss_subject.id AS student_subject_id',
        'ss_subject.name_en AS student_subject_name_en',
        'ss_subject.name_fr AS student_subject_name_fr',
        'ts_tutor.id AS tutor_id',
        'ts_tutor.first_name AS tutor_first_name',
        'ts_tutor.last_name AS tutor_last_name',
        'ts_tutor.profile_image AS tutor_profile_image',
        'ts.subject_id AS ts_subject_id',
        'ts_subject.name_en AS ts_subject_name_en',
        'ts_subject.name_fr AS ts_subject_name_fr',
      ])
      .groupBy('student.id, ss_subject.id, ts.id, ts_tutor.id, ts_subject.id')
      .where('student.id = :student_id', { student_id })
      .getRawMany();
  }

  //get student details subject wise
  async findStudentFollowupDetails(
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const student = await this.userService.findUserByIdWithRole(student_id);
    const followupData = await this.tutorFollowUpService.getLastStudentFollowup(
      tutor_id,
      student_id,
      subject_id,
    );
    const sessions = await this.tutorSessionService.findSubjectSessions(
      tutor_id,
      student_id,
      subject_id,
    );

    // const session_ids = sessions.map((session) => session.id);
    // const confirm_sessions =
    //   await this.tutorStudentService.getAllConfirmSessions(session_ids); //type = true
    const sessionData = sessions.length === 0 ? null : sessions;
    const session_ids = sessionData
      ? sessionData.map((session) => session.id)
      : [];

    const confirm_sessions = sessionData
      ? await this.tutorStudentService.getAllConfirmSessions(session_ids)
      : []; //type = true

    const student_program =
      await this.studentProgramService.findStudentTotalSessions(
        student_id,
        tutor_id,
        subject_id,
      );

    const result = await Promise.all(
      sessions.map(async (session) => ({
        first_session_date: sessions?.[0]?.session_date || null,
        last_session_date:
          sessions?.[sessions.length - 1]?.session_date || null,
        total_session: student_program?.count || 0,
        confirm_sessions: confirm_sessions.length || 0,
        subject_name_en: session?.['session_subject_id']?.['name_en'],
        subject_name_fr: session?.['session_subject_id']?.['name_fr'],
      })),
    );

    return {
      followups: followupData.length > 0 ? followupData : [],
      role: student?.['role_id']?.['name'],
      first_name: student?.first_name,
      last_name: student?.last_name,
      profile_image: student?.profile_image,
      total_session: student_program?.count || 0,
      confirm_sessions: 0,
      ...result.reduce(
        (acc, item) => ({
          ...acc,
          ...item,
        }),
        {},
      ),
    };
  }

  //get tutor-followup by id
  async findTutorById(id: number): Promise<TutorFollowUpEntity> {
    const tutor = await this.tutorFollowUpService.findStudentFollowUpById(id);
    if (!tutor) {
      throw new BadRequestException(`Tutor with ID ${id} not found`);
    }
    return tutor;
  }

  //second tab
  //get last followup date
  // async getLastFollowup(): Promise<any> {
  //   return await this.StudentParentFollowUpRepository.createQueryBuilder(
  //     'followup',
  //   )
  //     .leftJoin('followup.tutor', 'tutor')
  //     .leftJoin('followup.user', 'user')
  //     .orderBy('followup.created_at', 'DESC')
  //     .getOne();
  // }

  //get student-followups by student id
  // async findAllStudentParentFollowUpsById(user_id: number): Promise<any> {
  //   const followups =
  //     await this.StudentParentFollowUpRepository.createQueryBuilder('followup')
  //       .leftJoin('followup.tutor', 'tutor')
  //       .leftJoin('followup.user', 'user')
  //       .select([
  //         'followup',
  //         'user.id',
  //         'user.first_name',
  //         'user.last_name',
  //         'user.email',
  //         'tutor.id',
  //         'tutor.first_name',
  //         'tutor.last_name',
  //         'tutor.email',
  //       ])
  //       .where('followup.user = :user_id', { user_id })
  //       .getMany();

  //   let totalAssessment = 0;
  //   for (let j = 0; j < followups.length; j++) {
  //     totalAssessment += followups[j].star_rating;
  //   }
  //   let sessionData = {};
  //   for (let i = 0; i < followups.length; i++) {
  //     const sessions = await this.tutorSessionService.findSessions(
  //       user_id,
  //       followups[i].user['id'],
  //     );

  //     const session_ids = [];
  //     for (let j = 0; j < sessions.length; j++) {
  //       session_ids.push(sessions[j].id);
  //     }
  //     const confirm_sessions =
  //       await this.tutorStudentService.getAllConfirmSessions(session_ids);

  //     const last_date_of_followups = await this.getLastFollowup();

  //     sessionData = {
  //       followup: followups,
  //       first_session_date: sessions[i]?.session_date,
  //       confirm_sessions: confirm_sessions?.length,
  //       total_session: sessions?.length,
  //       date_of_assessment: last_date_of_followups?.created_at,
  //       subject: sessions[i]?.session_subject_id['subject_name'],
  //       assessment: followups[i]?.star_rating,
  //       general_assessment: Math.round(
  //         Number(totalAssessment / followups.length),
  //       ),
  //     };
  //     return sessionData;
  //   }
  // }

  //get tutor details for subject
  async findAllStudentFollowUps(
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const tutor = await this.userService.findById(tutor_id);
    const data = await this.tutorFollowUpService.getStudentFollowup(
      tutor_id,
      student_id,
      subject_id,
    );
    const followupData = await data.getMany();
    const totalAssessment = followupData.reduce(
      (total, followup) => total + followup?.['star_rating'],
      0,
    );
    const sessions = await this.tutorSessionService.findSubjectSessions(
      tutor_id,
      student_id,
      subject_id,
    );
    // const session_ids = sessions.map((session) => session.id);
    // const confirm_sessions =
    //   await this.tutorStudentService.getAllConfirmSessions(session_ids); //type = true
    const sessionData = sessions.length === 0 ? null : sessions;
    const session_ids = sessionData
      ? sessionData.map((session) => session.id)
      : [];

    const confirm_sessions = sessionData
      ? await this.tutorStudentService.getAllConfirmSessions(session_ids)
      : []; //type = true

    const student_program =
      await this.studentProgramService.findStudentTotalSessions(
        student_id,
        tutor_id,
        subject_id,
      );

    const result = await Promise.all(
      sessions.map(async (session) => ({
        first_session_date: sessions?.[0]?.session_date || null,
        last_session_date:
          sessions?.[sessions.length - 1]?.session_date || null,
        total_session: student_program?.count || 0,
        confirm_sessions: confirm_sessions.length || 0,
        subject_name_en: session?.['session_subject_id']?.['name_en'] || null,
        subject_name_fr: session?.['session_subject_id']?.['name_fr'] || null,
        general_assessment: parseFloat(
          (totalAssessment / followupData.length).toFixed(2) || null,
        ),
      })),
    );

    return {
      followups: followupData.length > 0 ? followupData : [],
      first_name: tutor?.first_name,
      last_name: tutor?.last_name,
      profile_image: tutor?.profile_image,
      total_session: student_program?.count || 0,
      confirm_sessions: 0,
      general_assessment: 0,
      ...result.reduce(
        (acc, item) => ({
          ...acc,
          ...item,
        }),
        {},
      ),
    };
  }

  //parent section
  //get parent students with additional details
  async findParentStudents(parent_id: number): Promise<any> {
    return await this.userService.getParentStudent(parent_id);

    // const sessionData = [];
    // for (let i = 0; i < parent_students.length; i++) {
    //   const sessions = await this.tutorSessionService.findSessions(
    //     parent_id,
    //     parent_students[i].id,
    //   );

    //   const session_ids = [];
    //   for (let j = 0; j < sessions.length; j++) {
    //     session_ids.push(sessions[j].id);
    //   }
    //   const confirm_sessions =
    //     await this.tutorStudentService.getAllConfirmSessions(session_ids);

    // const last_date_of_followups = await this.getLastFollowup();
    // const data = await this.tutorFollowUpService.findAll(
    //   parent_students[i].id,
    // );

    // sessionData.push({
    //   ...parent_students[i],
    // no_of_sessions: `${confirm_sessions.length + '/' + sessions.length}`,
    //   confirm_sessions: confirm_sessions.length,
    //   total_session: sessions.length,
    //   subject: sessions[i]?.session_subject_id['subject_name'],
    //   first_session_date: sessions[0]?.session_date,
    //   last_session_date: sessions[sessions.length - 1]?.session_date,
    // date_of_assessment: data[data.length - 1]?.created_at, //
    // progress_percentage: data[data.length - 1]?.progress_percentage || 0, // get all then get one
    //   });
    // }
    // return sessionData;
  }

  //find student subjects first tab
  async findParentStudentsSubjects(parent_id: number): Promise<any> {
    const parent_student = await this.userService.getParentStudent(parent_id);

    if (!parent_student || parent_student.length === 0) {
      throw new BadRequestException("Parent's students not found");
    }

    const studentData = parent_student.map((student) => {
      const subjects = student?.['subjects']?.map((item) => item.subject);

      return {
        student_id: student.id,
        first_name: student?.['first_name'],
        last_name: student?.['last_name'],
        profile_image: student?.['profile_image'] || null,
        subjects: subjects,
      };
    });

    return studentData;
  }

  //find student subjects second tab
  // async findParentStudentsSubjectDetails(parent_id: number): Promise<any> {
  //   const parent_student = await this.userService.getParentStudent(parent_id);

  //   if (!parent_student || parent_student.length === 0) {
  //     throw new NotFoundException("Parent's students not found");
  //   }

  //   const studentData = parent_student.map((student) => {
  //     const subjects = student?.['subjects']?.map(
  //       (item) => item.subject?.subject_name,
  //     );

  //     return {
  //       student_id: student.id,
  //       first_name: student?.['first_name'],
  //       last_name: student?.['last_name'],
  //       profile_image: student?.['profile_image'] || null,
  //       subjects: subjects,
  //     };
  //   });

  //   return studentData;
  // }

  //get parent's followups
  async findParentsFollowups(
    parent_id: number,
  ): Promise<StudentParentFollowUp[]> {
    const parent =
      await this.StudentParentFollowUpRepository.createQueryBuilder('followup')
        .select([
          'followup',
          'parent.id',
          'parent.first_name',
          'parent.last_name',
          'parent.email',
          'parent.profile_image',
          'tutor.id',
          'tutor.first_name',
          'tutor.last_name',
          'tutor.email',
          'tutor.profile_image',
          'role.name',
          'subject',
        ])
        .leftJoin('followup.tutor', 'tutor')
        .leftJoin('followup.parent', 'parent')
        .leftJoin('followup.subject', 'subject')
        .leftJoin('parent.role_id', 'role')
        .where('parent.id = :parent_id', { parent_id })
        .orderBy('followup.created_at', 'DESC')
        .getMany();
    if (parent.length === 0) {
      const user = await this.userService.findUserByIdWithRole(parent_id);
      const data = {
        parent: {
          id: user?.id,
          first_name: user?.first_name,
          last_name: user?.last_name,
          profile_image: user?.profile_image,
          role: user?.role_id?.['name'],
        },
      };
      parent.push(data as unknown as StudentParentFollowUpEntity);
    }
    return parent;
  }

  //get parent details student & subject wise
  async findParentsSubjectDetails(parent_id: number): Promise<any> {
    const parent_student = await this.userService.getParentStudent(parent_id);
    if (!parent_student || parent_student.length === 0) {
      throw new BadRequestException("Parent's students not found");
    }

    const studentData = await Promise.all(
      parent_student.map(async (student) => {
        const students = await this.getStudentSubjectDetails(student?.['id']);

        const subjectDetails = students.map((student) => ({
          tutor_id: student?.['tutor_id'],
          ts_subject_id: student?.['ts_subject_id'],
          ts_subject_name_en: student?.['ts_subject_name_en'],
          ts_subject_name_fr: student?.['ts_subject_name_fr'],
        }));

        return {
          student_id: student?.['id'],
          student_first_name: student?.['first_name'],
          student_last_name: student?.['last_name'],
          student_profile_image: student?.['profile_image'],
          subjects: subjectDetails,
        };
      }),
    );

    if (studentData.length === 0) {
      throw new BadRequestException('Student data not found');
    }
    return studentData;
  }

  //get all parent followups with details
  async findParentFollowupDetails(
    parent_id: number,
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const tutor = await this.userService.findById(tutor_id);
    const followupData = await this.tutorFollowUpService.getParentFollowup(
      tutor_id,
      parent_id,
      student_id,
      subject_id,
    );
    const sessions = await this.tutorSessionService.findSubjectSessions(
      tutor_id,
      student_id,
      subject_id,
    );
    // const session_ids = sessions.map((session) => session.id);
    // const confirm_sessions =
    //   await this.tutorStudentService.getAllConfirmSessions(session_ids); //type = true
    const sessionData = sessions.length === 0 ? null : sessions;
    const session_ids = sessionData
      ? sessionData.map((session) => session.id)
      : [];

    const confirm_sessions = sessionData
      ? await this.tutorStudentService.getAllConfirmSessions(session_ids)
      : []; //type = true

    const student_program =
      await this.studentProgramService.findStudentTotalSessions(
        student_id,
        tutor_id,
        subject_id,
      );

    const result = await Promise.all(
      sessions.map(async (session) => ({
        subject_name_en: session?.['session_subject_id']?.['name_en'],
        subject_name_fr: session?.['session_subject_id']?.['name_fr'],
        first_session_date: sessions?.[0]?.session_date || null,
        last_session_date:
          sessions?.[sessions.length - 1]?.session_date || null,
        total_session: student_program?.count || 0,
        confirm_sessions: confirm_sessions.length || 0,
      })),
    );
    return {
      followups: followupData.length > 0 ? followupData : [],
      first_name: tutor?.first_name,
      last_name: tutor?.last_name,
      profile_image: tutor?.profile_image,
      total_session: student_program?.count || 0,
      confirm_sessions: 0,
      ...result.reduce(
        (acc, item) => ({
          ...acc,
          ...item,
        }),
        {},
      ),
    };
  }
}

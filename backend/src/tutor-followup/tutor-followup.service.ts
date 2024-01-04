import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  StudentParentFollowUpEntity as StudentParentFollowUp,
  TutorFollowUpEntity as TutorFollowUp,
  TutorStudentEntity as TutorStudent,
} from 'src/entities';
import { TutorFollowUpModel } from '../dto/index';
import { TutorSessionService } from 'src/tutor-session/tutor-session.service';
import { TutorStudentService } from 'src/tutor-student/tutor-student.service';
import { UserService } from 'src/user';
import { StudentProgramService } from 'src/student_program/student_program.service';

@Injectable()
export class TutorFollowUpService {
  constructor(
    @InjectRepository(TutorFollowUp)
    private readonly TutorFollowUpRepository: Repository<TutorFollowUp>,
    @InjectRepository(StudentParentFollowUp)
    private readonly StudentEntityRepository: Repository<StudentParentFollowUp>,
    @InjectRepository(TutorStudent)
    private readonly TutorStudentRepository: Repository<TutorStudent>,
    private readonly tutorSessionService: TutorSessionService,
    private readonly tutorStudentService: TutorStudentService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly studentProgramService: StudentProgramService,
  ) {}

  // create tutor throw student followup
  async createTutorFollowUp(
    tutorFollowUpModel: TutorFollowUpModel,
    id: number,
  ): Promise<TutorFollowUp> {
    tutorFollowUpModel['user'] = id;
    const followup = this.TutorFollowUpRepository.create(tutorFollowUpModel);
    // followup.progress_percentage = Number(
    //   followup.progress_towards_goal.toFixed(2),
    // );
    const student_program =
      await this.studentProgramService.findStudentTotalSessions(
        followup?.['student'],
        followup['user'],
        followup?.['subject'],
      );

    const existingSession = await this.tutorSessionService.findSubjectSessions(
      followup['user'],
      followup['student'],
      followup['subject'],
    );
    const session_ids = existingSession.map((session) => session.id);
    const confirm_sessions =
      await this.tutorStudentService.getAllConfirmSessions(session_ids); //type = true
    const total_session = confirm_sessions.length || 0;

    const student_progress_percentage =
      (total_session / student_program?.count) * 100;

    followup.progress_percentage = Number(
      student_progress_percentage.toFixed(2),
    );
    return this.TutorFollowUpRepository.save(followup);
  }

  // get student followup by followup id
  async findStudentFollowUpById(id: number): Promise<TutorFollowUp> {
    return await this.TutorFollowUpRepository.createQueryBuilder('followup')
      .select([
        'followup',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'user.profile_image',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.profile_image',
      ])
      .leftJoin('followup.student', 'student')
      .leftJoin('followup.user', 'user')
      .where('followup.id = :id', { id })
      .getOne();
  }

  //first tab
  //get tutor followups
  async getTutorFollowup(tutor_id: number, name: string): Promise<any> {
    return await this.TutorFollowUpRepository.createQueryBuilder('followup')
      .leftJoin('followup.user', 'user')
      .leftJoin('followup.student', 'student')
      .leftJoin('followup.subject', 'subject')
      .select([
        'MAX(followup.id) AS followup_id',
        'MAX(followup.created_at) AS created_at',
        'followup.subject_id AS subject_id',
        'subject.name_en AS subject_name_en',
        'subject.name_fr AS subject_name_fr',
        'followup.user_id AS user_id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'user.profile_image',
        'followup.student_id AS student_id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.profile_image',
      ])
      .groupBy(
        'followup.user_id, user.id, followup.subject_id, subject.id, followup.student_id,student.id',
      )
      .where(
        "(followup.user = :tutor_id) AND (CONCAT(student.first_name, ' ', student.last_name) LIKE :name)",
        {
          tutor_id,
          name: `%${name}%`,
        },
      )
      .addOrderBy('created_at', 'DESC')
      .getRawMany();
  }

  async getStudentProgressPercentage(id: number): Promise<any> {
    return await this.TutorFollowUpRepository.createQueryBuilder('followup')
      .select(['followup.id', 'followup.progress_percentage'])
      .where('followup.id = :id', {
        id,
      })
      .getOne();
  }

  // get all student followup with additional details
  async findStudentFollowupReports(
    tutor_id: number,
    page: number,
    limit: number,
    searchQuery?: string,
  ): Promise<any> {
    const followups = await this.getTutorFollowup(tutor_id, searchQuery);

    const followUpPromises = followups.map(async (followup) => {
      const sessions = await this.tutorSessionService.findSubjectSessions(
        tutor_id,
        followup?.['student_id'],
        followup?.['subject_id'],
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

      const student_progress_percentage =
        await this.getStudentProgressPercentage(followup?.['followup_id']);

      const student_program =
        await this.studentProgramService.findStudentTotalSessions(
          followup?.['student_id'],
          tutor_id,
          followup?.['subject_id'],
        );

      return {
        student_id: followup?.['student_id'],
        first_name: followup?.['student_first_name'],
        last_name: followup?.['student_last_name'],
        profile_image: followup?.['student_profile_image'] || null,
        total_session: student_program?.count || 0,
        confirm_sessions: confirm_sessions.length,
        date_of_assessment: followup?.['created_at'],
        subject_id: followup?.['subject_id'] || null,
        subject_name_en: followup?.['subject_name_en'] || null,
        subject_name_fr: followup?.['subject_name_fr'] || null,
        progress_percentage:
          student_progress_percentage?.['progress_percentage'],
        // first_session_date: sessions[0]?.['session_date'] || null,
        // last_session_date:
        //   sessions[sessions.length - 1]?.['session_date'] || null,
      };
    });

    const followUpData = await Promise.all(followUpPromises);

    const totalfollowUpData = followUpData.length;
    const totalPages = Math.ceil(totalfollowUpData / limit);
    const startIndex = (page - 1) * limit;

    const paginatedfollowUpData = followUpData.splice(startIndex, limit);

    return {
      followups: paginatedfollowUpData,
      totalfollowUpData,
      totalPages,
      currentPage: page,
    };
  }

  //get all student's last followup
  async getLastStudentFollowup(
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    return await this.TutorFollowUpRepository.createQueryBuilder('followup')
      .leftJoin('followup.user', 'user')
      .leftJoin('followup.student', 'student')
      .leftJoin('followup.subject', 'subject')
      .leftJoin('student.role_id', 'role')
      // .innerJoinAndMapMany(
      //   'followup.sessions',
      //   TutorSession,
      //   'tutor_session',
      //   'followup.user_id = tutor_session.user_id AND followup.student_id = tutor_session.student_id AND followup.subject_id = tutor_session.subject_id',
      // )
      // .leftJoin('tutor_session.session_subject_id', 'tutor_session_subject')
      // .leftJoinAndMapMany(
      //   'followup.complete_session',
      //   CompleteSession,
      //   'complete_session',
      //   'tutor_session.id = complete_session.session_id',
      // )
      .select([
        'followup',
        'subject.id',
        'subject.name_en',
        'subject.name_fr',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'user.profile_image',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.profile_image',
        'student.email',
        'role.name',
        // 'tutor_session',
        // 'tutor_session_subject',
        // 'complete_session',
      ])
      .where(
        'followup.user = :tutor_id AND followup.student = :student_id AND followup.subject = :subject_id',
        {
          tutor_id,
          student_id,
          subject_id,
        },
      )
      .orderBy('followup.created_at', 'DESC')
      .getMany();
  }

  // get all student followup in tutor
  async findAll(
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const followupData = await this.getLastStudentFollowup(
      tutor_id,
      student_id,
      subject_id,
    );

    const sessions = await this.tutorSessionService.findSubjectSessions(
      tutor_id,
      student_id,
      subject_id,
    );

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

    const followUpPromises = followupData.map(async (followup) => {
      return {
        first_name: followup?.['student']?.['first_name'],
        last_name: followup?.['student']?.['last_name'],
        profile_image: followup?.['student']?.['profile_image'] || null,
        first_session_date: sessions?.[0]?.session_date,
        last_session_date: sessions?.[sessions.length - 1]?.session_date,
        total_session: student_program?.count || 0,
        confirm_sessions: confirm_sessions.length || 0,
        subject_name_en: followup?.['subject']?.['name_en'],
        subject_name_fr: followup?.['subject']?.['name_fr'],
      };
    }, {});

    const result = await Promise.all(followUpPromises);
    return {
      followups: followupData,
      ...result.reduce(
        (acc, item) => ({
          ...acc,
          ...item,
        }),
        {},
      ),
    };
  }

  //for second tab
  //get tutor followups by student with tutor_id
  async findtutorfollowupByStudent(
    tutor_id: number,
    name: string,
  ): Promise<any> {
    return await this.StudentEntityRepository.createQueryBuilder('followup')
      .leftJoin('followup.tutor', 'tutor')
      .leftJoin('followup.student', 'student')
      .leftJoin('followup.parent', 'parent')
      .leftJoin('followup.subject', 'subject')
      .leftJoin('student.role_id', 'student_role')
      .leftJoin('parent.role_id', 'parent_role')
      .select([
        'MAX(followup.created_at) AS created_at',
        'AVG(followup.star_rating) AS star_rating',
        'followup.assessment_accessible AS assessment_accessible',
        'followup.student_id AS student_id',
        'student.first_name AS student_first_name',
        'student.last_name AS student_last_name',
        'student.profile_image AS student_profile_image',
        'student.gender AS student_gender',
        'followup.parent_id AS parent_id',
        'parent.first_name AS parent_first_name',
        'parent.last_name AS parent_last_name',
        'parent.email AS parent_email',
        'parent.profile_image AS parent_profile_image',
        'parent.gender AS parent_gender',
        'tutor.id AS tutor_id',
        'tutor.first_name AS tutor_first_name',
        'tutor.last_name AS tutor_last_name',
        'tutor.profile_image AS tutor_profile_image',
        'followup.student_id AS user_student_id',
        'student.first_name AS user_student_first_name',
        'student.last_name AS user_student_last_name',
        'followup.subject_id',
        'subject.name_en AS subject_name_en',
        'subject.name_fr AS subject_name_fr',
        'parent_role.name AS parent_role',
        'student_role.name AS student_role',
        'COUNT(*) AS count',
      ])
      .groupBy(
        'followup.assessment_accessible, followup.student_id,student.id,followup.parent_id, parent.id, followup.subject_id, subject.id, followup.tutor_id,tutor.id, followup.subject_id, parent_role.id,student_role.id',
      )
      .where(
        "(followup.tutor = :tutor_id) AND (followup.assessment_accessible = :assessment_accessible) AND (CONCAT(student.first_name, ' ', student.last_name) LIKE :name OR CONCAT(parent.first_name, ' ', parent.last_name) LIKE :name)",
        {
          tutor_id,
          assessment_accessible: 'Oui',
          name: `%${name}%`,
        },
      )
      .addOrderBy('created_at', 'DESC')
      .getRawMany();
  }

  //get all tutor evaluations details
  async findTutorDetails(
    tutor_id: number,
    page: number,
    limit: number,
    searchQuery: string,
  ): Promise<any> {
    const followups = await this.findtutorfollowupByStudent(
      tutor_id,
      searchQuery,
    );

    const followUpPromises = followups.map(async (user) => {
      const userData = {
        date_of_assessment: user?.created_at,
        subject_id: user?.['subject_id'] || null,
        subject_name_en: user?.['subject_name_en'] || null,
        subject_name_fr: user?.['subject_name_fr'] || null,
        general_assessment: parseFloat(user?.['star_rating'].toFixed(2)),
        assessment_accessible: user?.assessment_accessible,
      };
      if (user?.['parent_id'] != null) {
        return {
          role: user?.['parent_role'],
          user_id: user?.['parent_id'],
          first_name: user?.['parent_first_name'],
          last_name: user?.['parent_last_name'],
          profile_image: user?.['parent_profile_image'] || null,
          student_first_name: user?.['student_first_name'],
          student_last_name: user?.['student_last_name'],
          parent_gender: user?.['parent_gender'],
          ...userData,
          isParent: true,
        };
      } else {
        const student_parent = await this.userService.getStudentParent(
          user?.['student_id'],
        );
        const parent = await this.userService.findById(
          student_parent[0]?.['parent_id'],
        );

        return {
          role: user?.['student_role'],
          user_id: user?.['student_id'],
          first_name: user?.['student_first_name'],
          last_name: user?.['student_last_name'],
          profile_image: user?.['student_profile_image'] || null,
          parent_first_name: parent?.['first_name'],
          parent_last_name: parent?.['last_name'],
          student_gender: user?.['student_gender'],
          ...userData,
          isParent: false,
        };
      }
    });

    const data = await Promise.all(followUpPromises);
    const sessionsData = data.filter((item) => item !== undefined);

    const totalSession = sessionsData.length;
    const totalPages = Math.ceil(totalSession / limit);
    const startIndex = (page - 1) * limit;

    const paginatedSessionsData = sessionsData.splice(startIndex, limit);

    return {
      followups: paginatedSessionsData,
      totalSession,
      totalPages,
      currentPage: page,
    };
  }

  //get last student followup
  async getStudentFollowup(
    tutor_id: number,
    student_id: number,
    subject: number,
  ): Promise<any> {
    return await this.StudentEntityRepository.createQueryBuilder('followup')
      .leftJoin('followup.tutor', 'tutor')
      .leftJoin('followup.student', 'student')
      .leftJoin('student.role_id', 'role')
      .leftJoin('followup.subject', 'subject')
      // .leftJoinAndMapMany(
      //   'followup.sessions',
      //   TutorSession,
      //   'tutor_session',
      //   'followup.student_id = tutor_session.student_id AND followup.tutor_id = tutor_session.student_id AND followup.subject_id = tutor_session.subject_id',
      // )
      // .leftJoin('tutor_session.session_subject_id', 'tutor_session_subject')
      // .leftJoinAndMapMany(
      //   'followup.complete_session',
      //   CompleteSession,
      //   'complete_session',
      //   'tutor_session.id = complete_session.session_id',
      // )
      .select([
        'followup',
        'subject.id',
        'subject.name_en',
        'subject.name_fr',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.profile_image',
        'tutor.id',
        'tutor.first_name',
        'tutor.last_name',
        'tutor.email',
        'tutor.profile_image',
        'role.name',
        // 'tutor_session',
        // 'tutor_session_subject',
        // 'complete_session',
      ])
      .where(
        'followup.student = :student_id AND followup.tutor = :tutor_id AND subject.id = :subject AND followup.parent IS NULL',
        {
          student_id,
          tutor_id,
          subject,
        },
      )
      .orderBy('followup.created_at', 'DESC');
    // .getMany();
  }

  //get all student followup with details
  async findAllStudentFollowups(
    tutor_id: number,
    student_id: number,
    subject: number,
  ): Promise<any> {
    const data = await this.getStudentFollowup(tutor_id, student_id, subject);
    const followupData = await data
      .andWhere('followup.assessment_accessible = :assessment_accesible', {
        assessment_accesible: 'Oui',
      })
      .getMany();

    const totalAssessment = followupData.reduce(
      (total, followup) => total + followup?.['star_rating'],
      0,
    );

    const sessions = await this.tutorSessionService.findSubjectSessions(
      tutor_id,
      student_id,
      subject,
    );

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
        subject,
      );

    const followUpPromises = followupData.map(async (followup) => {
      return {
        first_name: followup?.student?.first_name,
        last_name: followup?.student?.last_name,
        profile_image: followup?.student?.profile_image || null,
        total_session: student_program?.count || 0,
        confirm_sessions: confirm_sessions?.length || 0,
        first_session_date: sessions?.[0]?.session_date,
        last_session_date: sessions?.[sessions.length - 1]?.session_date,
        subject_name_en: followup?.subject?.name_en,
        subject_name_fr: followup?.subject?.name_fr,
        general_assessment: parseFloat(
          (totalAssessment / followupData.length).toFixed(2),
        ),
      };
    });

    const result = await Promise.all(followUpPromises);
    return {
      followups: followupData,
      ...result.reduce(
        (acc, item) => ({
          ...acc,
          ...item,
        }),
        {},
      ),
    };
  }

  //get tutor student
  async findTutorStudent(tutor_id: number): Promise<any> {
    return await this.TutorStudentRepository.createQueryBuilder('tus')
      .leftJoin('tus.user', 'user')
      .leftJoin('tus.student', 'student')
      .select([
        'student.id AS student_id',
        'student.first_name AS first_name',
        'student.last_name AS last_name',
        'student.profile_image AS profile_image',
      ])
      .groupBy('student.id')
      .where('user.id = :tutor_id ', {
        tutor_id,
      })
      .getRawMany();
  }

  //get last parent followups
  async getParentFollowup(
    tutor_id: number,
    parent_id: number,
    student_id: number,
    subject: number,
  ): Promise<any> {
    return await this.StudentEntityRepository.createQueryBuilder('followup')
      .leftJoin('followup.tutor', 'tutor')
      .leftJoin('followup.student', 'student')
      .leftJoin('followup.parent', 'parent')
      .leftJoin('parent.role_id', 'role')
      .leftJoin('followup.subject', 'subject')
      .select([
        'followup',
        'subject.id',
        'subject.name_en',
        'subject.name_fr',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.profile_image',
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
      ])
      .where(
        'followup.parent = :parent_id AND followup.student = :student_id AND followup.tutor = :tutor_id AND subject.id = :subject',
        {
          parent_id,
          student_id,
          tutor_id,
          subject,
        },
      )
      .orderBy('followup.created_at', 'DESC')
      .getMany();
  }

  //get all parent followup with details
  async findAllParentFollowups(
    tutor_id: number,
    parent_id: number,
    subject: number,
  ): Promise<any> {
    const parent = await this.userService.findById(parent_id);
    const parent_student = await this.userService.getParentStudent(parent_id);
    const tutor_student = await this.findTutorStudent(tutor_id);

    const parent_student_ids = parent_student.map((ps) => ps.id);
    const students = tutor_student.filter((ts) =>
      parent_student_ids.includes(ts.student_id),
    );

    const student_ids = students.map((student) => student.student_id);
    const followupsPromises = student_ids.map((student_id) =>
      this.getParentFollowup(tutor_id, parent_id, student_id, subject),
    );
    const followups = await Promise.all(followupsPromises);
    const followupData = followups.flat();
    followupData.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    const totalAssessment = followupData.reduce(
      (total, followup) => total + followup?.['star_rating'],
      0,
    );

    const accessibleFollowups = followupData.filter(
      (followup) => followup.assessment_accessible === 'Oui',
    );
    return {
      followups: accessibleFollowups.length > 0 ? accessibleFollowups : [],
      students,
      first_name: parent?.first_name,
      last_name: parent?.last_name,
      profile_image: parent?.profile_image || null,
      parent_gender: parent?.['gender'],
      subject_name_en: followupData[0]?.subject?.['name_en'],
      subject_name_fr: followupData[0]?.subject?.['name_fr'],
      isParent: true,
      general_assessment: parseFloat(
        (totalAssessment / followupData.length).toFixed(2) || null,
      ),
    };
  }

  //find tutor's general evaluation
  async findtutorEvalutionGeneral(tutor_id: number): Promise<any> {
    const followup = await this.StudentEntityRepository.createQueryBuilder(
      'followup',
    )
      .leftJoin('followup.tutor', 'tutor')
      .leftJoin('followup.student', 'student')
      .leftJoin('followup.parent', 'parent')
      .leftJoin('followup.subject', 'subject')
      .select(['AVG(followup.star_rating) AS star_rating'])
      .where('followup.tutor = :tutor_id', {
        tutor_id,
      })
      .getRawMany();
    return followup[0]?.star_rating || 0;
  }
}

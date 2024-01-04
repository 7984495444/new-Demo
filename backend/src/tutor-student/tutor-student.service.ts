import {
  Inject,
  Injectable,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TutorStudentModel,
  TutorStudentMatchModel,
  TutorStudentMatchDraftModel,
} from '../dto/tutor.dto';
import {
  CompleteSessionEntity as CompleteSession,
  // StudentParentFollowUpEntity as StudentParentFollowUp,
  TutorSessionEntity as TutorSession,
  TutorStudentEntity as TutorStudent,
  StudentSubjectEntity as StudentSubject,
  TutorSubjectEntity as TutorSubject,
  SubjectEntity,
  TutorStudentMatchEntity as TutorStudentMatch,
  UserProfileEntity as UserProfile,
  TutorStudentMatchDraftEntity as TutorStudentMatchDraft,
} from '../entities/index';
import { TutorSessionService } from 'src/tutor-session/tutor-session.service';
import { UserService } from 'src/user/user.service';
import { StudentProgramService } from 'src/student_program/student_program.service';
import { TutorStudentSubjectService } from '../tutor_student_subject/tutor_student_subject.service';
import { UserProfileService } from '../user_profile/user_profile.service';
import { MySchoolLevelsService } from '../my_school_levels/my_school_levels.service';
import { timeZoneCovert } from '../utils/convert_timezone';

@Injectable()
export class TutorStudentService {
  constructor(
    @InjectRepository(TutorStudent)
    private readonly tutorStudentRepository: Repository<TutorStudent>,
    @InjectRepository(TutorSession)
    private readonly TutorSessionRepository: Repository<TutorSession>,
    @InjectRepository(CompleteSession)
    private readonly CompleteSessionRepository: Repository<CompleteSession>,
    // @InjectRepository(StudentParentFollowUp)
    // private readonly StudentEntityRepository: Repository<StudentParentFollowUp>,
    private readonly tutorSessionService: TutorSessionService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly studentProgramService: StudentProgramService,
    @Inject(forwardRef(() => TutorStudentSubjectService))
    private readonly tutorStudentSubjectService: TutorStudentSubjectService,
    @Inject(forwardRef(() => UserProfileService))
    private readonly userProfileService: UserProfileService,
    @Inject(forwardRef(() => MySchoolLevelsService))
    private readonly mySchoolLevelsService: MySchoolLevelsService,
    @InjectRepository(TutorStudentMatch)
    private readonly tutorStudentMatchRepository: Repository<TutorStudentMatch>,
    @InjectRepository(TutorStudentMatchDraft)
    private readonly tutorStudentMatchDraftRepository: Repository<TutorStudentMatchDraft>,
    private readonly timezoneConvert: timeZoneCovert,
  ) {}

  // Add tutor student
  async create(tutorStudentModel: TutorStudentModel): Promise<any> {
    const tutorStudent = await this.findTutorStudentWithSubject(
      tutorStudentModel?.student,
      tutorStudentModel?.subject,
    );
    if (!tutorStudent) {
      return await this.tutorStudentRepository.save(tutorStudentModel);
    } else {
      throw new BadRequestException('Tutor Student already exists.');
    }
  }

  //find tutor student
  async findTutorStudentWithSubject(
    student_id: number,
    subject_id: number,
  ): Promise<TutorStudent> {
    return await this.tutorStudentRepository
      .createQueryBuilder('ts')
      .leftJoin('ts.user', 'user')
      .leftJoin('ts.student', 'student')
      .leftJoin('ts.subject', 'subject')
      .select([
        'ts.id',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.profile_image',
      ])
      .where(
        'student.id =:student_id AND subject.id = :subject_id AND ts.confirmation = true',
        {
          student_id,
          subject_id,
        },
      )
      .getOne();
  }

  // Update tutor student status
  async update(
    student_id: number,
    user_id: number,
    tutorStudentModel: TutorStudentModel,
  ): Promise<any> {
    return await this.tutorStudentRepository
      .createQueryBuilder()
      .update('tutor_student')
      .set({
        confirmation: tutorStudentModel.confirmation,
      })
      .where(
        'tutor_student.user_id = :user_id AND tutor_student.student_id = :student_id AND tutor_student.subject_id = :subject_id',
        {
          user_id,
          student_id,
          subject_id: tutorStudentModel.subject,
        },
      )
      .execute();
  }

  // Cancle tutor student request
  async updateRefuse(addRefuseModel): Promise<any> {
    return await this.tutorStudentRepository
      .createQueryBuilder()
      .update('tutor_student')
      .set({
        confirmation: addRefuseModel.confirmation,
        raison_for_refuse: addRefuseModel.raison_for_refuse,
        note: addRefuseModel.note,
      })
      .where(
        'tutor_student.user_id = :user AND tutor_student.student_id != :student',
        {
          student: addRefuseModel.student,
          user: addRefuseModel.user,
        },
      )
      .execute();
  }

  async findTutorStudent(tutor_id: number): Promise<TutorStudent[]> {
    return await this.tutorStudentRepository
      .createQueryBuilder('tutor_student')
      .select([
        'tutor_student',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.profile_image',
      ])
      .leftJoin('tutor_student.student', 'student')
      .leftJoin('tutor_student.user', 'user')
      .where(
        'tutor_student.user = :tutor_id AND tutor_student.confirmation = true',
        {
          tutor_id,
        },
      )
      .getMany();
  }

  //find tutor's student list
  async findTutorStudentDetails(tutor_id: number): Promise<TutorStudent[]> {
    return await this.tutorStudentRepository
      .createQueryBuilder('tutor_student')
      .select([
        'student.id AS id',
        'student.first_name AS first_name',
        'student.last_name AS last_name',
        'student.email AS email',
        'student.profile_image AS profile_image',
        'student.parent_id  AS parent_id',
      ])
      .leftJoin('tutor_student.student', 'student')
      .leftJoin('tutor_student.user', 'user')
      .addGroupBy('student.id')
      .where(
        'tutor_student.user = :tutor_id AND tutor_student.confirmation = true',
        {
          tutor_id,
        },
      )
      .getRawMany();
  }

  async getAllConfirmSessions(id, type = true): Promise<any> {
    //type-> true = confirm_session | false = all_types
    const complete_session =
      this.CompleteSessionRepository.createQueryBuilder('complete_session');

    complete_session.where('complete_session.session_id IN (:...ids)', {
      ids: id,
    });

    if (type) {
      complete_session.andWhere('complete_session.type = :type', {
        type: 'confirm_session',
      });
    }
    return await complete_session.getMany();
  }

  // get tutor-students and their details
  async findTutorStudentslist(
    tutor_id: number,
    page: number,
    limit: number,
    searchQuery?: string,
  ): Promise<any> {
    const tutor_student = await this.tutorStudentRepository
      .createQueryBuilder('tus') //tutor_student = tus
      .leftJoin('tus.student', 'student')
      .leftJoin('tus.user', 'user')
      .leftJoin('tus.subject', 'tus_subject')
      .innerJoinAndMapMany(
        'tus.user',
        TutorSubject,
        'ts', //tutor_subject = ts
        'tus.user_id = ts.tutor_id AND tus.subject_id = ts.subject_id',
      )
      .innerJoinAndMapMany(
        'tus.subject',
        StudentSubject,
        'ss', //student_subject = ss
        'ss.student_id = tus.student_id AND ss.subject_id = ts.subject_id',
      )
      .leftJoin('ss.subject', 'subject')
      .select([
        'tus.id AS id',
        'student.id AS student_id',
        'student.first_name AS student_first_name',
        'student.last_name AS student_last_name',
        'student.email AS student_email',
        'student.profile_image AS student_profile_image',
        'student.parent_id AS student_parent_id',
        'student.school_level AS student_academic_level',
        'user.id AS tutor_id',
        'user.first_name AS tutor_first_name',
        'user.last_name AS tutor_last_name',
        'user.email AS tutor_email',
        'user.profile_image AS tutor_profile_image',
        'subject.id AS subject_id',
        'subject.name_en AS subject_name_en',
        'subject.name_fr AS subject_name_fr',
      ])
      .where(
        "(tus.user = :tutor_id) AND (tus.confirmation = true) AND (CONCAT(student.first_name, ' ', student.last_name) LIKE :name)",
        {
          tutor_id,
          name: `%${searchQuery}%`,
        },
      )
      .getRawMany();

    const sessionsData = await Promise.all(
      tutor_student.map(async (ts) => {
        const tutor_student_sessions =
          await this.tutorSessionService.findSubjectSessions(
            tutor_id,
            ts.student_id,
            ts.subject_id,
          );

        const sessions =
          tutor_student_sessions.length === 0 ? null : tutor_student_sessions;

        const session_ids = sessions
          ? sessions.map((session) => session.id)
          : [];

        const confirm_sessions = sessions
          ? await this.getAllConfirmSessions(session_ids)
          : []; //type = true

        const session_dates = sessions
          ? sessions.map((session) => ({
              session_date: session.session_date,
            }))
          : [];

        const student_program =
          await this.studentProgramService.findStudentTotalSessions(
            ts.student_id,
            tutor_id,
            ts.subject_id,
          );

        const school_level = await this.mySchoolLevelsService.findById(
          sessions ? sessions[0]?.student?.school_level : null,
        );

        return {
          ...ts,
          academic_level_en: school_level ? school_level?.name_en : null,
          academic_level_fr: school_level ? school_level?.name_fr : null,
          first_session_date: sessions ? sessions[0]?.['session_date'] : null,
          last_session_date: sessions
            ? sessions[sessions.length - 1]?.['session_date']
            : null,
          confirm_sessions: sessions ? confirm_sessions.length : null,
          total_session: student_program?.count || 0,
          session_dates: session_dates,
        };
      }),
    );

    const totalSession = sessionsData.length;
    const totalPages = Math.ceil(totalSession / limit);
    const startIndex = (page - 1) * limit;
    const paginatedSessionsData = sessionsData.splice(startIndex, limit);
    const uniqueStudents = new Set(
      paginatedSessionsData.map((item) => item.student_id),
    );

    return {
      tutor_student: paginatedSessionsData,
      totalSession,
      totalPages,
      totalStudent: uniqueStudents.size,
      currentPage: page,
    };
  }

  async findOne(tutor_id: number, id: number, subject: number): Promise<any> {
    const perticular_student_details = await this.tutorStudentRepository
      .createQueryBuilder('tutor_student')
      .select([
        'tutor_student',
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
        'role',
      ])
      .leftJoin('tutor_student.student', 'student')
      .leftJoin('tutor_student.user', 'user')
      .leftJoin('student.role_id', 'role')
      .where('tutor_student.id = :id', { id })
      .getOne();

    let sessions;
    if (subject == 0) {
      sessions = await this.tutorSessionService.findTutorStudentsSession(
        perticular_student_details?.['student']?.['id'],
        perticular_student_details?.['student']?.['role_id']?.['name'],
      );
    } else {
      sessions = await this.tutorSessionService.findSubjectSessions(
        tutor_id,
        perticular_student_details?.['student']?.['id'],
        subject,
      );
    }

    const session_dates = sessions.map((session) => ({
      session_date: session.session_date,
    }));

    return {
      perticular_student_details,
      session_dates: session_dates,
    };
  }

  async findStudentSessionDetails(
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const sessions = await this.TutorSessionRepository.createQueryBuilder(
      'tutor_session',
    )
      .leftJoinAndSelect('tutor_session.user', 'user')
      .leftJoinAndSelect('tutor_session.student', 'student')
      .innerJoinAndMapMany(
        'tutor_session.student',
        SubjectEntity,
        'subject',
        'tutor_session.subject_id = subject.id AND subject.id = :subject_id',
        { subject_id },
      )
      .innerJoinAndMapMany(
        'tutor_session.id',
        CompleteSession,
        'complete_session',
        'complete_session.session_id = tutor_session.id',
      )
      .select([
        'tutor_session',
        'subject',
        'user.id',
        'user.first_name',
        'user.last_name',
        'student.id',
        'student.first_name',
        'student.last_name',
        'complete_session',
      ])
      .where('user.id = :user_id AND student.id = :id', {
        user_id: tutor_id,
        id: student_id,
      })
      .orderBy('tutor_session.session_date', 'ASC')
      .getRawMany();
    if (sessions && sessions.length > 0) {
      for (const session of sessions) {
        session.tutor_session_session_date =
          await this.timezoneConvert.convertToUserTimeZone(
            session.tutor_session_session_date,
          );
      }
    }
    return sessions;
  }

  //get student subjects and other details
  async findStudentSubjectDetails(
    tutor_id: number,
    student_id: number,
    subject_id: number,
    page: number,
    limit: number,
  ): Promise<any> {
    const offset = (page - 1) * limit;
    const sessions = await this.findStudentSessionDetails(
      tutor_id,
      student_id,
      subject_id,
    );

    const student_program =
      await this.studentProgramService.findStudentTotalSessions(
        student_id,
        tutor_id,
        subject_id,
      );

    const confirmSessions = {};
    const sessionsData = [];
    for (let j = 0; j < sessions.length; j++) {
      const subjectName = sessions.map((session) => session.name_en);
      confirmSessions[subjectName[0]] = confirmSessions[subjectName[0]]
        ? confirmSessions[subjectName[0]] + 1
        : 1;

      const cancelSessionUserId = sessions
        ? sessions[j].complete_session_cancel_session_userId
        : null;
      let firstName: string;
      let lastName: string;
      let role_name: string;
      let profileImage: string;

      if (cancelSessionUserId) {
        const user = await this.userService.findUserByIdWithRole(
          cancelSessionUserId,
        );
        if (user) {
          firstName = user.first_name;
          lastName = user.last_name;
          profileImage = user.profile_image;
          role_name = user.role_id?.['name'];
        }
      }

      sessionsData.push({
        program_name_en: sessions[j].subject_name_en,
        program_name_fr: sessions[j].subject_name_fr,
        subject_name_en: sessions[j].subject_name_en,
        subject_name_fr: sessions[j].subject_name_fr,
        session_date: sessions[j]?.tutor_session_session_date,
        status: sessions[j].complete_session_type,
        document_name: sessions[j].complete_session_document_name,
        confirm_sessions: confirmSessions[subjectName[0]],
        session_recording: sessions[j].complete_session_session_recording,
        user: {
          cancel_session_id: cancelSessionUserId,
          first_name: firstName,
          last_name: lastName,
          profile_image: profileImage,
          role_name: role_name,
          reason_for_cancellation:
            sessions[j].complete_session_reason_for_cancellation || null,
          dating_summary: sessions[j].complete_session_dating_summary || null,
          next_meeting_summary:
            sessions[j].complete_session_next_meeting_summary || null,
          additional_notes:
            sessions[j].tutor_session_session_description || null,
        },
        total_session: student_program?.count || 0,
        duration: sessions[j].complete_session_duration,
      });
    }

    sessionsData.sort((a, b) => {
      const dateA = new Date(a.session_date).getTime();
      const dateB = new Date(b.session_date).getTime();
      return dateB - dateA;
    });

    const totalSession = sessionsData.length;
    const totalPages = Math.ceil(totalSession / limit);
    const paginatedResults = sessionsData.splice(offset, limit);
    return {
      tutor_student: paginatedResults,
      totalSession,
      totalPages,
      currentPage: page,
    };
  }

  async findTutorStudentIds(tutor_id: number): Promise<any> {
    const result = await this.tutorStudentRepository
      .createQueryBuilder('tus')
      .leftJoin('tus.user', 'user')
      .leftJoin('tus.student', 'student')
      .select(['student.id AS id'])
      .groupBy('student.id')
      .where('user.id = :tutor_id AND tus.confirmation = true', {
        tutor_id,
      })
      .getRawMany();
    const student_ids = result.map((user) => user.id);
    return student_ids;
  }

  async parentStudentTutorIds(student_id: number[]): Promise<TutorStudent[]> {
    return await this.tutorStudentRepository
      .createQueryBuilder('tus')
      .leftJoin('tus.user', 'user')
      .leftJoin('tus.student', 'student')
      .select([
        'user.id AS id',
        'user.first_name AS first_name',
        'user.last_name AS last_name',
        'user.email AS email',
        'user.profile_image AS profile_image',
        'user.active AS active',
        'user.gender AS gender',
        'user.dob AS dob',
        'user.created_at AS created_at',
      ])
      .groupBy('user.id')
      .where('student.id IN (:...student_id) AND tus.confirmation = true', {
        student_id,
      })
      .getRawMany();
  }

  //get parent student's session history
  async findParentStudentSubjectDetails(
    student_id: number,
    page: number,
    limit: number,
  ): Promise<any> {
    const student = await this.userService.findUserByIdWithRole(student_id);
    const sessions = await this.tutorSessionService.findTutorStudentsSession(
      student_id,
      student?.role_id?.['name'],
    );

    const confirmSessions = {};
    const sessionsData = [];
    await Promise.all(
      sessions.map(async (session) => {
        const confirm_sessions = await this.getAllConfirmSessions(
          [session.id],
          false,
        ); //type = false

        const student_program =
          await this.studentProgramService.findStudentTotalSessions(
            student_id,
            session?.user?.['id'],
            session.session_subject_id?.['id'],
          );

        if (confirm_sessions.length > 0) {
          const subjectName = session.session_subject_id?.['name_en'];
          confirmSessions[subjectName] = confirmSessions[subjectName]
            ? confirmSessions[subjectName] + 1
            : 1;

          const cancelSessionUserId =
            confirm_sessions[0]?.cancel_session_userId;
          let firstName: string;
          let lastName: string;
          let role_name: string;
          let profileImage: string;

          if (cancelSessionUserId) {
            const user = await this.userService.findUserByIdWithRole(
              cancelSessionUserId,
            );
            if (user) {
              firstName = user.first_name;
              lastName = user.last_name;
              profileImage = user.profile_image;
              role_name = user.role_id?.['name'];
            }
          }

          sessionsData.push({
            complete_session_id: confirm_sessions[0]?.id,
            program_name_en: subjectName || null,
            program_name_fr: session.session_subject_id?.['name_fr'] || null,
            subject_name_en: subjectName || null,
            subject_name_fr: session.session_subject_id?.['name_fr'] || null,
            session_date: session?.session_date || null,
            status: confirm_sessions[0]?.type || null,
            document_name: confirm_sessions[0]?.document_name || null,
            confirm_sessions: confirmSessions[subjectName] || 0,
            total_session: student_program?.count || 0,
            duration: confirm_sessions[0]?.duration || null,
            session_recording: confirm_sessions[0]?.session_recording,
            user: {
              cancel_session_id: confirm_sessions[0]?.cancel_session_userId,
              first_name: firstName,
              last_name: lastName,
              profile_image: profileImage,
              role_name: role_name,
              reason_for_cancellation:
                confirm_sessions[0].reason_for_cancellation || null,
              dating_summary: confirm_sessions[0].dating_summary || null,
              next_meeting_summary:
                confirm_sessions[0].next_meeting_summary || null,
              additional_notes: confirm_sessions[0].session_description || null,
            },
          });
        }
      }),
    );
    sessionsData.sort((a, b) => {
      const dateA = new Date(a.session_date).getTime();
      const dateB = new Date(b.session_date).getTime();
      return dateB - dateA;
    });

    const totalSession = sessionsData.length;
    const totalPages = Math.ceil(totalSession / limit);
    const offset = (page - 1) * limit;
    const paginatedResults = sessionsData.splice(offset, limit);

    return {
      tutor_student: paginatedResults,
      totalSession,
      totalPages,
      currentPage: page,
    };
  }

  //get role wise tutor details
  async findRoleWiseTutor(user_id: number[]): Promise<any> {
    const data = await this.tutorStudentRepository
      .createQueryBuilder('tus')
      .leftJoin('tus.user', 'user')
      .leftJoin('tus.student', 'student')
      .leftJoin('tus.subject', 'subject')
      .select([
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.profile_image',
        'student.school_level',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.profile_image',
      ])
      .addGroupBy('student.id, user.id')
      .where(
        'student.id IN (:...user_id) AND tus.confirmation = :confirmation',
        { user_id, confirmation: true },
      )
      .getRawMany();

    const result = await Promise.all(
      data.map(async (item) => {
        const subjects = await this.tutorSessionService.findSessionSubjects(
          item?.user_id,
          item?.student_id,
        );

        if (subjects && subjects.length > 0) {
          return {
            student_id: item?.student_id,
            student_first_name: item?.student_first_name,
            student_last_name: item?.student_last_name,
            student_profile_image: item?.student_profile_image,
            school_level: item?.student_school_level,
            tutor_id: item?.user_id,
            tutor_first_name: item?.user_first_name,
            tutor_last_name: item?.user_last_name,
            tutor_profile_image: item?.user_profile_image,
            subjects: subjects,
          };
        }
      }),
    );
    return result.filter((item) => item !== undefined);
  }

  //get student statistics
  async findStudentStatistics(user_id: number[]): Promise<any> {
    const studentData = await Promise.all(
      user_id.map(async (user) => {
        const student_details =
          await this.tutorStudentSubjectService.findStudentAllSubject(user);

        if (student_details.length === 0) {
          return null;
        }

        const subjects = student_details.map((student) => ({
          subject_id: student.id,
          subject_name_en: student?.['subject_name_en'],
          subject_name_fr: student?.['subject_name_fr'],
        }));

        const subjectSessions = await Promise.all(
          subjects.map(async (subject) => {
            const tutor = await this.findTutorStudentWithSubject(
              student_details[0]?.['student_id'],
              subject.subject_id,
            );

            return this.tutorSessionService.findSubjectSessions(
              tutor?.user?.['id'],
              student_details[0]?.['student_id'],
              subject.subject_id,
            );
          }),
        );

        const first_session_date = subjectSessions.map((sessions) => ({
          session_date: sessions[0]?.session_date || null,
        }));

        const last_session_date = subjectSessions.map((sessions) => ({
          session_date: sessions[sessions.length - 1]?.session_date || null,
        }));

        return {
          student_id: student_details[0]?.['student_id'],
          student_first_name: student_details[0]?.['student_first_name'],
          student_last_name: student_details[0]?.['student_last_name'],
          student_profile_image: student_details[0]?.['student_profile_image'],
          school_level: student_details[0]?.['student_school_level'],
          subjects,
          first_session_date,
          last_session_date,
        };
      }),
    );
    return studentData.filter((student) => student !== null);
  }

  async findTutorStudentsWithSearch(
    tutor_id: number,
    search: string,
  ): Promise<any> {
    return await this.tutorStudentRepository
      .createQueryBuilder('tutor_student')
      .select([
        'student.id AS id',
        'student.first_name AS first_name',
        'student.last_name AS last_name',
        'student.email AS email',
        'student.profile_image AS profile_image',
        'student.phone_no AS phone_no',
      ])
      .leftJoin('tutor_student.student', 'student')
      .leftJoin('tutor_student.user', 'user')
      .where(
        "(tutor_student.user = :tutor_id) AND (tutor_student.confirmation = true) AND (CONCAT(student.first_name, ' ', student.last_name) LIKE :search)",
        {
          tutor_id,
          search: `%${search}%`,
        },
      )
      .orderBy('student.id', 'ASC')
      .getRawMany();
  }

  //find admin tutor's associate student details
  async getTutorStudentsDetails(
    admin_id: number,
    user_id: number,
    page: number,
    limit: number,
    search: string,
  ): Promise<any> {
    const user = await this.userService.findUserByIdWithRole(user_id);

    const associated_admin = await this.userService.findUserByIdWithRole(
      admin_id,
    );

    let students = [];
    if (user.role_id?.['id'] === 2) {
      students = await this.findTutorStudentsWithSearch(user_id, search);
    } else if (user.role_id?.['id'] === 3) {
      students = await this.userService.getParentStudentsWithSearch(
        user_id,
        search,
      );
    }

    const studentPromises = students.map(async (student) => {
      return {
        id: student?.['id'],
        student_first_name: student?.['first_name'],
        student_last_name: student?.['last_name'],
        student_profile_image: student?.['profile_image'],
        admin_first_name: associated_admin?.first_name,
        admin_last_name: associated_admin?.last_name,
        admin_profile_image: associated_admin?.profile_image,
        program_title: '',
        program_progress: '',
      };
    });
    const student_details = await Promise.all(studentPromises);
    const totalStudents = student_details.length;
    const totalPages = Math.ceil(totalStudents / limit);
    const startIndex = (page - 1) * limit;

    const paginatedTutorData = student_details.splice(startIndex, limit);

    return {
      students: paginatedTutorData,
      totalStudents,
      totalPages,
      currentPage: page,
    };
  }

  async getAllAdminStudentsDetails(
    admin_id: number,
    role_id: number,
    page: number,
    limit: number,
    search: string,
  ): Promise<any> {
    const associated_admin = await this.userService.findUserByIdWithRole(
      admin_id,
    );
    const students = await this.userService.getAdminLinkedUsersWithSearch(
      role_id,
      search,
    );
    const studentPromises = students.map(async (student) => {
      return {
        id: student?.['id'],
        student_first_name: student?.['first_name'],
        student_last_name: student?.['last_name'],
        student_profile_image: student?.['profile_image'],
        admin_first_name: associated_admin?.first_name,
        admin_last_name: associated_admin?.last_name,
        admin_profile_image: associated_admin?.profile_image,
        program_title: '',
        program_progress: '',
      };
    });
    const student_details = await Promise.all(studentPromises);
    const totalStudents = student_details.length;
    const totalPages = Math.ceil(totalStudents / limit);
    const startIndex = (page - 1) * limit;

    const paginatedTutorData = student_details.splice(startIndex, limit);

    return {
      students: paginatedTutorData,
      totalStudents,
      totalPages,
      currentPage: page,
    };
  }

  //find student not linked subjects
  async findNotLinkedStudents(
    student_id: number,
    student_lessons: number[],
  ): Promise<any> {
    const students = await this.tutorStudentRepository
      .createQueryBuilder('tutor_student')
      .leftJoin('tutor_student.student', 'student')
      .leftJoin('tutor_student.subject', 'subject')
      .leftJoin('tutor_student.user', 'user')
      .select(['subject.id AS subject_id'])
      .where('student.id = :student_id AND tutor_student.confirmation = true', {
        student_id,
      })
      .groupBy('subject.id')
      .getRawMany();
    const subject_ids = new Set(students.map((subject) => subject.subject_id));
    const notLinkedSubjects = student_lessons.filter(
      (subject) => !subject_ids.has(subject),
    );
    return notLinkedSubjects;
  }

  //find existing tutor students
  async findTutorStudents(tutor_id: number, subject_id: number): Promise<any> {
    const students = await this.tutorStudentRepository
      .createQueryBuilder('tutor_student')
      .select(['student.id AS id'])
      .leftJoin('tutor_student.student', 'student')
      .leftJoin('tutor_student.subject', 'subject')
      .leftJoin('tutor_student.user', 'user')
      .where(
        'tutor_student.user = :tutor_id AND subject.id = :subject_id AND tutor_student.confirmation = true',
        {
          tutor_id,
          subject_id,
        },
      )
      .groupBy('student.id')
      .getRawMany();
    const student_ids = students.map((student) => student.id);
    return student_ids;
  }

  //find tutor student match
  async findMatchingStudents(tutor_id: number): Promise<any> {
    const tutor_profile = await this.userProfileService.findByUserId(tutor_id);
    const tutor_frequency = await this.userProfileService.findUserAvailability(
      tutor_id,
    );
    const tutorLevels = tutor_profile?.levels_and_subjects;
    const tutorSubjects: number[] = [];
    await this.userProfileService.extractSubjects(tutorLevels, tutorSubjects);
    tutorSubjects.sort((a, b) => a - b);

    const lessonPromises = tutorSubjects.map(async (lesson) => {
      const existingStudent = await this.findTutorStudents(tutor_id, lesson);
      const students = await this.userService.getAllStudents(
        lesson,
        existingStudent,
      );

      const tutor_activation_bonus =
        await this.userProfileService.findTutorActivationBonus(tutor_id);
      const workload_varience =
        await this.userProfileService.findWorkloadVariance(tutor_id);

      //find student matching score
      const studentPromises = students.map(async (student) => {
        await this.deleteTutorStudentDraftMatches(tutor_id);
        const student_profile = await this.userProfileService.findByUserId(
          student?.id,
        );
        const student_frequency =
          await this.userProfileService.findUserAvailability(student?.id);

        //subject wise student's matching score
        let total_score = 0;
        total_score += tutor_activation_bonus;
        total_score += workload_varience;

        //find matching language-------
        const student_language = Number(student?.['language']);
        let language: number;
        if (
          (student_language &&
            tutor_profile?.['language'] &&
            student_language === tutor_profile?.['language']) ||
          ((student_language === 1 || student_language === 2) &&
            tutor_profile?.['language'] === 3) ||
          ((tutor_profile?.['language'] === 1 ||
            tutor_profile?.['language'] === 2) &&
            student_language === 3)
        ) {
          total_score += 100;
          language = 100;
        }

        //same school level
        const student_school_level = student?.['school_level'];
        const student_level = await this.mySchoolLevelsService.findById(
          student_school_level,
        );
        const matchingLevels =
          await this.userProfileService.calculateSameLevelLessonScore(
            tutorLevels,
            student_level?.name_en,
          );
        total_score += matchingLevels;

        //find same level lessons
        const same_lesson_score =
          await this.userProfileService.calculateSameSubjectsScore(
            tutorLevels,
            student_profile?.my_needs?.matter,
          );
        total_score += same_lesson_score;

        //find matching schedule
        let matchingSchedule: number;
        if (tutor_frequency && student_frequency) {
          matchingSchedule =
            await this.userProfileService.calculateSameScheduleScore(
              tutor_frequency,
              student_frequency,
            );
          total_score += matchingSchedule;
        }

        //find matching length of lessons
        let matchingDurations: number;
        if (tutor_frequency && student_frequency) {
          matchingDurations =
            await this.userProfileService.calculateSameDurationScore(
              tutor_frequency,
              student_frequency,
            );
          total_score += matchingDurations;
        }

        //find matching frequency
        let frequency = 0;
        if (
          student_frequency &&
          tutor_frequency &&
          student_frequency.length == tutor_frequency.length
        ) {
          frequency = await this.userProfileService.calculateSameFrequencyScore(
            tutor_frequency,
            student_frequency,
          );
          total_score += frequency;
        }

        // Find matching difficulties
        const difficulties_score =
          await this.userProfileService.calculateSameDifficultiesScore(
            tutor_profile?.difficulties,
            student_profile?.followed_by?.status,
          );
        total_score += difficulties_score?.total_score;

        //find matching interests
        const matchingInterests =
          await this.userProfileService.calculateSameInterestScore(
            tutor_profile?.interests,
            student_profile?.interests,
          );
        total_score += matchingInterests;

        await this.createTutorStudentDraft({
          user: Number(tutor_id),
          student: student?.id,
          subject: lesson,
          language: language || 0,
          school_level: matchingLevels,
          level_lesson: same_lesson_score,
          same_schedule: matchingSchedule,
          length_of_lessons: matchingDurations,
          frequency_of_lessons: frequency,
          learning_issues: difficulties_score?.total_score,
          interests: matchingInterests,
          tutor_activation_bonus: tutor_activation_bonus,
          workload_varience: workload_varience,
        });

        //matches
        return {
          total_score: total_score,
          user: tutor_id,
          student: student?.['id'],
          subject: lesson,
        };
      });
      const studentData = await Promise.all(studentPromises);
      return studentData.filter((student) => student !== null);
    });

    const results = await Promise.all(lessonPromises);
    const data = results.flat();
    await this.deleteTutorStudentMatches(tutor_id);
    await this.createTutorStudentMatches(data);
    return data;
  }

  //delete existing matches
  async deleteTutorStudentMatches(user_id: number): Promise<void> {
    await this.tutorStudentMatchRepository.delete({
      user: user_id,
    });
  }

  //delete existing matching scores
  async deleteTutorStudentDraftMatches(user_id: number): Promise<void> {
    await this.tutorStudentMatchDraftRepository.delete({
      user: user_id,
    });
  }

  //create tutor student match
  async createTutorStudentMatches(
    tutorStudentMatchModel: TutorStudentMatchModel[],
  ): Promise<TutorStudentMatch[]> {
    return await this.tutorStudentMatchRepository.save(tutorStudentMatchModel);
  }

  //store tutor student match all scores
  async createTutorStudentDraft(
    tutorStudentMatchDraftModel: TutorStudentMatchDraftModel,
  ): Promise<TutorStudentMatchDraft> {
    return await this.tutorStudentMatchDraftRepository.save(
      tutorStudentMatchDraftModel,
    );
  }

  //find matching tutor details
  async findStudentsMatchingTutor(
    student_id: number,
    subject_id: number,
    total_score: number,
  ): Promise<TutorStudentMatch> {
    return await this.tutorStudentMatchRepository
      .createQueryBuilder('matches')
      .leftJoin('matches.user', 'tutor')
      .leftJoin('matches.student', 'student')
      .leftJoin('matches.subject', 'subject')
      .select([
        'matches.is_completed AS is_completed',
        'tutor.id AS tutor_id',
        'tutor.first_name AS tutor_first_name',
        'tutor.last_name AS tutor_last_name',
        'tutor.profile_image AS tutor_profile_image',
      ])
      .where(
        'student.id = :student_id AND subject.id = :subject_id AND matches.total_score = :total_score',
        {
          student_id,
          subject_id,
          total_score,
        },
      )
      .getRawOne();
  }

  //find all student matches
  async findAllStudentMatches(
    is_completed: number,
    page: number,
    limit: number,
    search: string,
  ): Promise<any> {
    const studentMatches = await this.tutorStudentMatchRepository
      .createQueryBuilder('matches')
      .leftJoin('matches.user', 'user')
      .leftJoin('matches.student', 'student')
      .leftJoin('matches.subject', 'subject')
      .select([
        'MAX(matches.total_score) AS total_score',
        'student.id AS student_id',
        'student.first_name AS first_name',
        'student.last_name AS last_name',
        'student.profile_image AS profile_image',
        'subject.id AS subject_id',
        'subject.name_en AS subject_name_en',
        'subject.name_fr AS subject_name_fr',
      ])
      .groupBy('student.id, subject.id')
      .where(
        "(matches.is_completed = :is_completed) AND (CONCAT(student.first_name, ' ', student.last_name) ILIKE :search OR CONCAT(user.first_name, ' ', user.last_name) ILIKE :search)",
        {
          is_completed,
          search: `%${search}%`,
        },
      )
      .getRawMany();

    const student_details = await Promise.all(
      studentMatches.map(async (student) => {
        const tutor = await this.findStudentsMatchingTutor(
          student.student_id,
          student.subject_id,
          student.total_score,
        );
        return {
          total_score: student?.total_score,
          student_id: student?.student_id,
          first_name: student.first_name,
          last_name: student.last_name,
          profile_image: student.profile_image,
          subject_id: student.subject_id,
          subject_name_en: student.subject_name_en,
          subject_name_fr: student.subject_name_fr,
          tutor_id: tutor?.['tutor_id'],
          tutor_first_name: tutor?.['tutor_first_name'],
          tutor_last_name: tutor?.['tutor_last_name'],
          tutor_profile_image: tutor?.['tutor_profile_image'],
          is_completed: tutor?.is_completed,
        };
      }),
    );
    const totalMatches = student_details.length;
    const totalPages = Math.ceil(totalMatches / limit);
    const startIndex = (page - 1) * limit;

    const paginatedStudentMatches = student_details.splice(startIndex, limit);

    return {
      studentsMatches: paginatedStudentMatches,
      totalMatches,
      totalPages,
      currentPage: page,
    };
  }

  //find top 10 matching student details with scores
  async findStudentMatchesDetails(
    student_id: number,
    subject_id: number,
  ): Promise<TutorStudentMatch[]> {
    return await this.tutorStudentMatchRepository
      .createQueryBuilder('matches')
      .leftJoin('matches.user', 'tutor')
      .leftJoin('matches.student', 'student')
      .leftJoin('matches.subject', 'subject')
      .leftJoinAndMapOne(
        'matches.drafts',
        TutorStudentMatchDraft,
        'draft_matches',
        'draft_matches.user_id = matches.user_id AND draft_matches.student_id = matches.student_id AND draft_matches.subject_id = matches.subject_id',
      )
      .select([
        'matches.total_score AS total_score',
        'student.id AS student_id',
        'student.first_name AS student_first_name',
        'student.last_name AS student_last_name',
        'student.profile_image AS student_profile_image',
        'subject.id AS subject_id',
        'subject.name_en AS subject_name_en',
        'subject.name_fr AS subject_name_fr',
        'tutor.id AS tutor_id',
        'tutor.first_name AS tutor_first_name',
        'tutor.last_name AS tutor_last_name',
        'tutor.profile_image AS tutor_profile_image',
        'draft_matches.language AS langauge_score',
        'draft_matches.school_level AS school_level',
        'draft_matches.level_lesson AS level_lesson',
        'draft_matches.same_schedule AS same_schedule',
        'draft_matches.length_of_lessons AS length_of_lessons',
        'draft_matches.frequency_of_lessons AS frequency_of_lessons',
        'draft_matches.learning_issues AS learning_issues',
        'draft_matches.interests AS interests',
        'draft_matches.tutor_activation_bonus AS tutor_activation_bonus',
        'draft_matches.workload_varience AS workload_varience',
      ])
      .where('student.id = :student_id AND subject.id = :subject_id', {
        student_id,
        subject_id,
      })
      .orderBy('matches.total_score', 'DESC')
      .limit(10)
      .getRawMany();
  }

  //find pending matches
  async findPendingStudentMatches(
    student_id: number,
    subject_id: number,
  ): Promise<any[]> {
    return await this.tutorStudentMatchRepository
      .createQueryBuilder('matches')
      .leftJoin('matches.user', 'user')
      .leftJoin('matches.student', 'student')
      .leftJoin('matches.subject', 'subject')
      .select(['matches'])
      .where(
        'matches.student_id = :student_id AND matches.subject_id = :subject_id AND matches.is_completed = :is_completed',
        { student_id, subject_id, is_completed: 0 },
      )
      .getMany();
  }

  //accept or refuse match
  async updateStudentMatchStatus(
    user_id: number,
    student_id: number,
    subject_id: number,
    is_completed: number,
  ): Promise<any> {
    const match = await this.tutorStudentMatchRepository
      .createQueryBuilder()
      .update()
      .set({ is_completed: is_completed })
      .where(
        'user.id = :user_id AND student_id = :student_id AND subject_id = :subject_id',
        {
          user_id,
          student_id,
          subject_id,
        },
      )
      .execute();

    if ((is_completed = 1)) {
      const pendinMatches = await this.findPendingStudentMatches(
        student_id,
        subject_id,
      );

      await Promise.all(
        pendinMatches.map(async (match) => {
          await this.tutorStudentMatchRepository
            .createQueryBuilder()
            .update()
            .set({ is_completed: 2 })
            .where('id = :matchId', { matchId: match.id })
            .execute();
        }),
      );
    }
    return match;
  }
}

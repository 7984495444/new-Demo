import { HttpStatus, Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  TutorSessionModel,
  TutorSessionDraftModel,
  // TutorSessionCancleSessionModel,
  TutorSessionDraftUpdateModel,
  TutorSessionCancleSessionModel,
  // TutorEditSessionDeleteModel,
  TutorSessionUpdateDraft,
} from '../dto/index';
import {
  SubjectEntity as Subject,
  TutorSessionEntity as TutorSession,
  TutorSessionDraftEntity as TutorSessionDraft,
  CompleteSessionEntity as CompleteSession,
  StudentParentFollowUpEntity as StudentParentFollowUp,
  TutorSubjectEntity,
  ToDoEntity,
  TutorStudentEntity,
} from '../entities/index';
import { timeZoneCovert } from '../utils/convert_timezone';
import { StudentProgramService } from 'src/student_program/student_program.service';
import { UserService } from 'src/user';
import { LessonSpaceService } from '../lesson_space/lesson_space.service';
import * as moment from 'moment';
import { Cron } from '@nestjs/schedule';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class TutorSessionService {
  constructor(
    @InjectRepository(TutorSession)
    private readonly tutorSessionRepository: Repository<TutorSession>,
    @InjectRepository(TutorSubjectEntity)
    private readonly tutorSubjectRepository: Repository<TutorSubjectEntity>,
    @InjectRepository(TutorSessionDraft)
    private readonly tutorSessionDraftRepository: Repository<TutorSessionDraft>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(CompleteSession)
    private readonly completeSessionRepository: Repository<CompleteSession>,
    @InjectRepository(StudentParentFollowUp)
    private readonly StudentEntityRepository: Repository<StudentParentFollowUp>,
    private readonly timezoneConvert: timeZoneCovert,
    private readonly studentProgramService: StudentProgramService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly lessonSpaceService: LessonSpaceService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(tutorSessionModel: TutorSessionModel): Promise<any> {
    // const data = await this.tutorSubjectRepository
    //   .createQueryBuilder('tutor_subject')
    //   .where(
    //     'tutor_subject.tutor_id = :user_id AND tutor_subject.subject_id = :subject_id',
    //     {
    //       user_id: tutorSessionModel['user'],
    //       subject_id: tutorSessionModel.session_subject_id,
    //     },
    //   )
    //   .execute();

    await this.lessonSpaceService.createUserLessonSpace(
      tutorSessionModel?.['user'], //creator_id
      tutorSessionModel?.['user'], //tutor_id
      tutorSessionModel?.['student'], //student_id
      tutorSessionModel?.['session_subject_id'], //subject_id
    );
    await this.lessonSpaceService.createUserLessonSpace(
      tutorSessionModel?.['student'], //creator_id
      tutorSessionModel?.['user'], //tutor_id
      tutorSessionModel?.['student'], //student_id
      tutorSessionModel?.['session_subject_id'], //subject_id
    );

    const student_program =
      await this.studentProgramService.findStudentTotalSessions(
        tutorSessionModel?.['student'],
        tutorSessionModel?.['user'],
        tutorSessionModel?.['session_subject_id'],
      );

    const existingSession = await this.findSubjectSessions(
      tutorSessionModel?.['user'],
      tutorSessionModel?.['student'],
      tutorSessionModel?.['session_subject_id'],
    );

    if (existingSession.length < student_program?.count) {
      return await this.tutorSessionRepository.save(tutorSessionModel);
    } else if (existingSession.length === student_program?.count) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Please update the program count',
        count: student_program?.count,
      };
    }
    // if (data.length === 0) {
    //   await this.tutorSubjectRepository.save({
    //     subject: tutorSessionModel.session_subject_id,
    //     user: tutorSessionModel['user'],
    //   });
    // }
    // return await this.tutorSessionRepository.save(tutorSessionModel);
  }

  async SearchStudentTutors(
    tutor_id: number,
    name: string,
  ): Promise<TutorSession[]> {
    const sessions = await this.tutorSessionRepository
      .createQueryBuilder('session')
      .select([
        'session',
        'session_subject_id',
        'complete_session_id',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.parent_id',
      ])
      .leftJoin('session.student', 'student')
      .leftJoin('session.session_subject_id', 'session_subject_id')
      .leftJoin('session.user', 'user')
      .where(
        "(session.user = :tutor_id) AND (session.is_draft = :is_draft) AND (CONCAT(student.first_name, ' ', student.last_name) LIKE :name)",
        { tutor_id, is_draft: 1, name: `%${name}%` },
      )
      .getMany();
    if (sessions && sessions.length > 0) {
      for (const session of sessions) {
        session.session_date = await this.timezoneConvert.convertToUserTimeZone(
          session.session_date,
        );
        session.session_time =
          await this.timezoneConvert.convertStringFromLocaltoUTC(
            session.session_time,
          );
      }
    }
    return sessions;
  }

  async findTutorStudentsSession(
    id: number,
    role: string,
  ): Promise<TutorSession[]> {
    const queryBuilder = await this.tutorSessionRepository
      .createQueryBuilder('session')
      .select([
        'session',
        'session.session_date',
        'session_subject_id',
        'complete_session_id',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'user.profile_image',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.parent_id',
        'student.profile_image',
      ])
      .leftJoin('session.student', 'student')
      .leftJoin('session.session_subject_id', 'session_subject_id')
      .leftJoin('session.user', 'user')
      .orderBy('session.session_date', 'ASC');

    if (role === 'tutor') {
      queryBuilder.where(
        'session.user_id = :id AND session.is_draft = :is_draft AND session.IsDelete IS NULL',
        { id, is_draft: 1 },
      );
    } else if (role === 'student') {
      queryBuilder.where(
        'session.student_id = :id AND session.is_draft = :is_draft AND session.IsDelete IS NULL',
        { id, is_draft: 1 },
      );
    } else if (role === 'parent') {
      queryBuilder.where(
        'student.parent_id = :id AND session.is_draft = :is_draft AND session.IsDelete IS NULL',
        { id, is_draft: 1 },
      );
    }

    const sessions = await queryBuilder.getMany();
    if (sessions && sessions.length > 0) {
      for (const session of sessions) {
        session.session_date = await this.timezoneConvert.convertToUserTimeZone(
          session.session_date,
        );
        session.session_time =
          await this.timezoneConvert.convertStringFromLocaltoUTC(
            session.session_time,
          );
      }
    }
    return sessions;
  }

  async findAll(): Promise<TutorSession[]> {
    const sessions = await this.tutorSessionRepository
      .createQueryBuilder('session')
      .select([
        'session',
        'session.session_date',
        'session_subject_id',
        'complete_session_id',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.parent_id',
      ])
      .where('session.is_draft = :is_draft', { is_draft: 1 })
      .leftJoin('session.student', 'student')
      .leftJoin('session.session_subject_id', 'session_subject_id')
      .leftJoin('session.user', 'user')
      .getMany();
    if (sessions && sessions.length > 0) {
      for (const session of sessions) {
        session.session_date = await this.timezoneConvert.convertToUserTimeZone(
          session.session_date,
        );
        session.session_time =
          await this.timezoneConvert.convertStringFromLocaltoUTC(
            session.session_time,
          );
      }
    }
    return sessions;
  }

  async findComplatedSession(student_ids) {
    const queryBuilder = await this.tutorSessionRepository
      .createQueryBuilder('session')
      .select([
        'session.id',
        'session.complete_session_id',
        'session_subject_id',
        'complete_session_id',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'user.profile_image',
      ])
      .leftJoin('session.student', 'student')
      .leftJoin('session.user', 'user')
      .leftJoin('session.session_subject_id', 'session_subject_id');

    queryBuilder.where(
      'session.student_id IN (:...student_ids) AND session.is_draft = :is_draft',
      { student_ids, is_draft: 1 },
    );

    const getSessions = await queryBuilder.getMany();
    const session = [];
    for (let index = 0; index < getSessions.length; index++) {
      const element = getSessions[index];

      if (element.complete_session_id !== null) {
        const complate_session = await this.completeSessionRepository.findOne({
          where: {
            id: Number(element.complete_session_id),
          },
        });
        if (
          complate_session &&
          complate_session.document_name &&
          complate_session.next_meeting_summary &&
          complate_session.is_approved !== 1
        ) {
          session.push({ ...element, complate_session });
        }
      }
    }
    return session;
  }

  async findAllByDate(): Promise<any[]> {
    const weekRange = await this.timezoneConvert.getStartAndEndTime('week');
    const sessions = await this.tutorSessionRepository
      .createQueryBuilder('session')
      .select([
        'session',
        'session_subject_id',
        'complete_session_id',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.parent_id',
      ])
      .leftJoin('session.student', 'student')
      .leftJoin('session.session_subject_id', 'session_subject_id')
      .leftJoin('session.user', 'user')
      .where(
        'session.session_date BETWEEN :startDate AND :endDate AND session.is_draft = :is_draft',
        {
          startDate: weekRange.start,
          endDate: weekRange.end,
          is_draft: 1,
        },
      )
      .orderBy('session.created_at', 'DESC')
      .getMany();
    if (sessions && sessions.length > 0) {
      for (const session of sessions) {
        session.session_date = await this.timezoneConvert.convertToUserTimeZone(
          session.session_date,
        );
        session.session_time =
          await this.timezoneConvert.convertStringFromLocaltoUTC(
            session.session_time,
          );
      }
    }
    return sessions;
  }

  async findByDate(): Promise<TutorSession[]> {
    const dayRange = await this.timezoneConvert.getStartAndEndTime('day');
    const sessions = await this.tutorSessionRepository
      .createQueryBuilder('session')
      .select([
        'session',
        'session.session_date',
        'session_subject_id',
        'complete_session_id',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.parent_id',
      ])
      .leftJoin('session.student', 'student')
      .leftJoin('session.session_subject_id', 'session_subject_id')
      .leftJoin('session.user', 'user')
      .where(
        'session.session_date BETWEEN :startDate AND :endDate AND session.is_draft = :is_draft',
        {
          startDate: dayRange.start,
          endDate: dayRange.end,
          is_draft: 1,
        },
      )
      .orderBy('session.created_at', 'DESC')
      .getMany();
    if (sessions && sessions.length > 0) {
      for (const session of sessions) {
        session.session_date = await this.timezoneConvert.convertToUserTimeZone(
          session.session_date,
        );
        session.session_time =
          await this.timezoneConvert.convertStringFromLocaltoUTC(
            session.session_time,
          );
      }
    }
    return sessions;
  }

  async findOne(id: number): Promise<TutorSession> {
    const session = await this.tutorSessionRepository
      .createQueryBuilder('session')
      .select([
        'session',
        'session_subject_id',
        'complete_session_id',
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
        'student.parent_id',
      ])
      .leftJoin('session.student', 'student')
      .leftJoin('session.session_subject_id', 'session_subject_id')
      .leftJoin('session.user', 'user')
      .where('session.id = :id', {
        id,
      })
      .getOne();
    if (session) {
      session.session_date = await this.timezoneConvert.convertToUserTimeZone(
        session.session_date,
      );
      session.session_time =
        await this.timezoneConvert.convertStringFromLocaltoUTC(
          session.session_time,
        );
    }
    return session;
  }

  async update(id: number, tutorSessionModel: any): Promise<any> {
    return await this.tutorSessionRepository.update(
      { id: id },
      { ...tutorSessionModel },
    );
  }

  async remove(id: number, tutorSessionModel: any): Promise<any> {
    return await this.tutorSessionRepository.update(
      { id: id },
      { ...tutorSessionModel, IsDelete: new Date(), is_draft: 2 },
    );
  }

  async createSessionEdit(
    tutorSessionDraftModel: TutorSessionDraftModel,
  ): Promise<any> {
    const data = await this.findSessionEdit(
      tutorSessionDraftModel.user,
      tutorSessionDraftModel.receive,
      tutorSessionDraftModel.source_id,
    );
    if (data) {
      await this.tutorSessionDraftRepository.update(
        { id: data.id },
        { ...tutorSessionDraftModel },
      );
      return this.findEditSessionData(data.id);
    } else {
      const sumbitData = await this.tutorSessionDraftRepository.save(
        tutorSessionDraftModel,
      );
      return this.findEditSessionData(sumbitData.id);
    }
  }

  async updateEditSession(
    id: number[],
    tutorSessionDraftUpdateModel: TutorSessionDraftUpdateModel,
  ): Promise<any> {
    return await this.tutorSessionDraftRepository.update(
      id,
      tutorSessionDraftUpdateModel,
    );
  }

  async findSessionEdit(
    user_id: number,
    receive_id: number,
    source_id: number,
  ): Promise<any> {
    return await this.tutorSessionDraftRepository
      .createQueryBuilder('sessionEdit')
      .leftJoin('sessionEdit.receive', 'receive')
      .leftJoin('sessionEdit.user', 'user')
      .select([
        'sessionEdit',
        'user.id',
        'user.first_name',
        'user.last_name',
        'receive.id',
        'receive.first_name',
        'receive.last_name',
      ])
      .where(
        'sessionEdit.user = :user_id AND sessionEdit.receive = :receive_id AND sessionEdit.source_id = :source_id AND sessionEdit.status = 0',
        {
          user_id,
          receive_id,
          source_id,
        },
      )
      .getOne();
  }

  async findEditSessionData(id: number): Promise<any> {
    const session = await this.tutorSessionDraftRepository
      .createQueryBuilder('sessionEdit')
      .leftJoin('sessionEdit.receive', 'receive')
      .leftJoin('sessionEdit.user', 'user')
      .leftJoin('sessionEdit.contact', 'contact')
      .leftJoin('user.role_id', 'user_role')
      .leftJoin('receive.role_id', 'receive_role')
      .leftJoin('contact.role_id', 'contact_role')
      .select([
        'sessionEdit',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.profile_image',
        'user_role.name',
        'user.parent_id',
        'receive.id',
        'receive.first_name',
        'receive.last_name',
        'receive_role.name',
        'receive.profile_image',
        'receive.parent_id',
        'contact.id',
        'contact.first_name',
        'contact.last_name',
        'contact_role.name',
        'contact.profile_image',
      ])
      .where('sessionEdit.id = :id', {
        id,
      })
      .getOne();
    let user;
    if (session && session.old_session_details) {
      const subjectId = session.old_session_details['session_subject_id'];
      const studentId = session?.old_session_details['student_id'];
      const receice_role_name = session?.receive['role_id'];
      const sender_role_name = session?.user['role_id'];

      if (
        receice_role_name.name === 'tutor' ||
        receice_role_name.name === 'parent'
      ) {
        user = await this.userService.findUserByIdWithRole(studentId);
      } else if (receice_role_name.name === 'student') {
        if (sender_role_name.name === 'parent') {
          user = session?.contact;
        } else if (sender_role_name.name === 'tutor') {
          user = session?.user;
        }
      }
      const subject = await this.subjectRepository
        .createQueryBuilder('subject')
        .select(['subject'])
        .where('subject.id = :id', {
          id: subjectId,
        })
        .getOne();
      session.old_session_details['subject_name_en'] = subject
        ? subject.name_en
        : null;
      session.old_session_details['subject_name_fr'] = subject
        ? subject.name_fr
        : null;
      session.new_session_details['session_date'] =
        await this.timezoneConvert.convertToUserTimeZone(
          session.new_session_details?.['session_date'],
        );
      session.new_session_details['session_time'] =
        await this.timezoneConvert.convertStringFromLocaltoUTC(
          session.new_session_details?.['session_time'],
        );
      session.old_session_details['session_date'] =
        await this.timezoneConvert.convertToUserTimeZone(
          session.old_session_details?.['session_date'],
        );
      session.old_session_details['session_time'] =
        await this.timezoneConvert.convertStringFromLocaltoUTC(
          session.old_session_details?.['session_time'],
        );
    }
    return {
      ...session,
      session_student_tutor_details: user,
      subject_name_en:
        session && session.old_session_details
          ? session.old_session_details['subject_name_en']
          : null,
      subject_name_fr:
        session && session.old_session_details
          ? session.old_session_details['subject_name_fr']
          : null,
    };
  }

  async cancleSessionEdit(
    id: number,
    tutorSessionCancleSessionModel: TutorSessionCancleSessionModel,
  ): Promise<any> {
    return await this.tutorSessionDraftRepository
      .createQueryBuilder()
      .update('tutor_session_draft')
      .set({
        note: tutorSessionCancleSessionModel.note,
      })
      .where('id IN (:...id)', { id })
      .execute();
  }

  // async removeSession(
  //   tutorEditSessionDeleteModel: TutorEditSessionDeleteModel,
  // ): Promise<any> {
  //   return await this.tutorSessionEditRepository.save(
  //     tutorEditSessionDeleteModel,
  //   );
  // }

  //find students by student id
  async findStudentFollowup(
    student_id: number,
  ): Promise<StudentParentFollowUp[]> {
    return await this.StudentEntityRepository.createQueryBuilder('followup')
      .leftJoin('followup.tutor', 'tutor')
      .leftJoin('followup.student', 'student')
      .select([
        'followup',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'tutor.id',
        'tutor.first_name',
        'tutor.last_name',
        'tutor.email',
      ])
      .where('followup.student = :student_id', { student_id })
      .getMany();
  }

  //find sessions for student
  async findSessions(user_id: number, student_id: number): Promise<any> {
    return await this.tutorSessionRepository
      .createQueryBuilder('tutorSession')
      .leftJoinAndSelect('tutorSession.user', 'user')
      .leftJoinAndSelect('tutorSession.student', 'student')
      .leftJoinAndSelect('tutorSession.session_subject_id', 'subject')
      .select([
        'tutorSession',
        'subject',
        'user.id',
        'user.first_name',
        'user.last_name',
        'student.id',
        'student.first_name',
        'student.last_name',
      ])
      .where(
        'user.id = :user_id AND student.id = :id AND tutorSession.is_draft = :is_draft',
        {
          user_id: user_id,
          id: student_id,
          is_draft: 1,
        },
      )
      .orderBy('tutorSession.session_date', 'DESC')
      .getMany();
  }
  async findSubjectSessions(
    user_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const sessions = await this.tutorSessionRepository
      .createQueryBuilder('tutorSession')
      .leftJoinAndSelect('tutorSession.user', 'user')
      .leftJoinAndSelect('tutorSession.student', 'student')
      .leftJoin('student.role_id', 'role')
      .leftJoinAndSelect('tutorSession.session_subject_id', 'subject')
      .select([
        'tutorSession',
        'subject',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.profile_image',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.profile_image',
        'role.name',
        'student.school_level',
      ])
      .where(
        'user.id = :user_id AND student.id = :id AND subject.id = :subject_id AND tutorSession.is_draft = :is_draft',
        {
          user_id: user_id,
          id: student_id,
          subject_id: subject_id,
          is_draft: 1,
        },
      )
      .orderBy('tutorSession.session_date', 'ASC')
      .getMany();
    if (sessions && sessions.length > 0) {
      for (const session of sessions) {
        session.session_date = await this.timezoneConvert.convertToUserTimeZone(
          session.session_date,
        );
      }
    }
    return sessions;
  }

  // get all confirm session with student_id
  async getAllConfirmSessions(id): Promise<any> {
    return await this.completeSessionRepository.find({
      where: { session_id: In(id), type: 'confirm_session' },
    });
  }

  //get last student followup
  async getLastStudentFollowup(): Promise<any> {
    return await this.StudentEntityRepository.createQueryBuilder('followup')
      .leftJoin('followup.tutor', 'tutor')
      .leftJoin('followup.student', 'student')
      .orderBy('followup.created_at', 'DESC')
      .getOne();
  }

  async findStudentSessionDetails(student_id: number): Promise<any> {
    const students = await this.findStudentFollowup(student_id);

    const sessionsData = [];
    for (let i = 0; i < students.length; i++) {
      const sessions = await this.findSessions(
        student_id,
        students[i].student['id'],
      );
      const sessionSubjectNames = new Set();
      const session_ids = [];
      for (let j = 0; j < sessions.length; j++) {
        session_ids.push(sessions[j].id);

        const subjectName = sessions[j].session_subject_id?.['subject_name'];
        if (subjectName) {
          sessionSubjectNames.add(subjectName);
        }
      }
      const confirm_sessions = await this.getAllConfirmSessions(session_ids); //type = true

      const last_date_of_followups = await this.getLastStudentFollowup();

      for (let j = 0; j < sessions.length; j++) {
        const session = sessions[j];

        const sessionWithAdditionalFields = {
          ...session,
          first_session_date: sessions[0]?.session_date,
          assessment_last_date: last_date_of_followups.created_at || null,
          confirm_sessions: confirm_sessions.length,
          total_session: sessions.length,
        };

        sessionsData.push({
          ...sessionWithAdditionalFields,
        });
      }
      return sessionsData;
    }
  }

  //get tutor & student wise session subject
  async findSessionSubjects(
    tutor_id: number,
    student_id: number,
  ): Promise<any> {
    return await this.tutorSubjectRepository
      .createQueryBuilder('ts')
      .leftJoin('ts.tutor', 'tutor')
      .leftJoin('ts.subject', 'subject')
      .innerJoinAndMapMany(
        'ts.student_subject',
        TutorStudentEntity,
        'tus',
        'ts.subject_id = tus.subject_id AND tus.student_id = :student_id AND tus.user_id = ts.tutor_id AND tus.confirmation = :confirmation',
        { student_id, confirmation: true },
      )
      .leftJoin('tus.subject', 'tus_subject')
      .select([
        'tus_subject.id AS id',
        'tus_subject.name_en AS subject_name_en',
        'tus_subject.name_fr AS subject_name_fr',
        'tus_subject.created_at AS created_at',
        'tus_subject.updated_at AS updated_at',
      ])
      .where('ts.tutor = :tutor_id', { tutor_id })
      .getRawMany();
  }

  //find students from current and last month sessions
  async getSessionsMonthWise(tutor_id: number): Promise<any> {
    const currentDate = new Date();
    const currentMonth_startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const nextMonth_startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );

    const lastMonth_startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    const lastMonth_endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );

    const tutor_last_active_students = await this.tutorSessionRepository
      .createQueryBuilder('session')
      .select(['session.student_id'])
      .where('session.session_date >= :lastMonth_startDate', {
        lastMonth_startDate,
      })
      .andWhere('session.session_date < :lastMonth_endDate', {
        lastMonth_endDate,
      })
      .andWhere('session.user_id = :tutor_id', { tutor_id })
      .groupBy('session.student_id')
      .getRawMany();

    const tutor_current_active_students = await this.tutorSessionRepository
      .createQueryBuilder('session')
      .select(['session.student_id'])
      .where('session.session_date >= :currentMonth_startDate', {
        currentMonth_startDate,
      })
      .andWhere('session.session_date < :nextMonth_startDate', {
        nextMonth_startDate,
      })
      .andWhere('session.user_id = :tutor_id', { tutor_id })
      .groupBy('session.student_id')
      .getRawMany();

    return {
      tutor_last_active_students,
      tutor_current_active_students,
    };
  }

  //get session using tutor_id, student_id and subject_id
  async getSession(
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    return await this.tutorSessionRepository
      .createQueryBuilder('session')
      .leftJoin('session.student', 'student')
      .leftJoin('session.session_subject_id', 'session_subject_id')
      .leftJoin('session.user', 'user')
      .select([
        'session',
        'session_subject_id',
        'complete_session_id',
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
        'student.parent_id',
      ])
      .where(
        'session.user_id = :tutor_id AND session.student_id = :student_id AND session.session_subject_id = :subject_id AND session.is_draft = :is_draft AND session.complete_session_id IS NULL',
        { tutor_id, student_id, subject_id, is_draft: 1 },
      )
      .orderBy('session.created_at', 'ASC')
      .getMany();
  }

  //get session using tutor_id, student_id and subject_id
  async getCompletedSession(
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    return await this.tutorSessionRepository
      .createQueryBuilder('session')
      .leftJoin('session.student', 'student')
      .leftJoin('session.session_subject_id', 'session_subject_id')
      .leftJoin('session.user', 'user')
      .select([
        'session',
        'session_subject_id',
        'complete_session_id',
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
        'student.parent_id',
      ])
      .where(
        'session.user_id = :tutor_id AND session.student_id = :student_id AND session.session_subject_id = :subject_id AND session.is_draft = :is_draft AND session.complete_session_id IS NOT NULL',
        { tutor_id, student_id, subject_id, is_draft: 1 },
      )
      .orderBy('session.created_at', 'ASC')
      .getOne();
  }

  //get all completed sessions
  async getSessionIds(
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    return await this.tutorSessionRepository
      .createQueryBuilder('ts')
      .innerJoinAndMapMany(
        'ts.complete_session',
        CompleteSession,
        'complete_session',
        'ts.id = complete_session.session_id AND complete_session.type = :type',
        { type: 'confirm_session' },
      )
      .select([
        'ts.id',
        'ts.session_duration',
        'ts.todo_count',
        'complete_session',
      ])
      .where(
        'ts.user_id = :tutor_id AND ts.student_id = :student_id AND ts.session_subject_id = :subject_id AND ts.is_draft = :is_draft AND ts.complete_session_id IS NOT NULL',
        { tutor_id, student_id, subject_id, is_draft: 1 },
      )
      .addGroupBy('ts.id, complete_session.id')
      .orderBy('ts.created_at', 'ASC')
      .getMany();
  }

  //get session's total tutoring hours
  async getSessionTotalTutoring(
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const sessions = await this.getSessionIds(tutor_id, student_id, subject_id);
    const completed_sessions = sessions.filter(
      (session) => session.complete_session.length > 0,
    );

    const session_duration = completed_sessions.map((session) => {
      if (session?.session_duration) {
        const parts = session.session_duration.split('h');
        let hours = 0;
        let minutes = 0;

        if (parts.length === 2) {
          hours = parseInt(parts[0]);
          minutes = parseInt(parts[1].replace('m', ''));
        } else if (parts.length === 1) {
          minutes = parseInt(parts[0].replace('m', ''));
        }
        return hours + minutes / 60;
      }
      return 0;
    });

    const totalHours = session_duration.reduce((acc, value) => acc + value, 0);
    return totalHours;
  }

  //update tutor session draft status
  async updateTutorSession(
    session_id: number,
    tutorSessionUpdateDraft: TutorSessionUpdateDraft,
  ): Promise<any> {
    return await this.tutorSessionRepository.update(
      { id: session_id },
      tutorSessionUpdateDraft,
    );
  }

  //calculate session end time
  async calculateSessionEndTime(
    session_date: string,
    session_duration: string,
  ) {
    const sessionDate = new Date(session_date);

    const parts = session_duration.split('h');
    let hours = 0;
    let minutes = 0;

    if (parts.length === 2) {
      hours = parseInt(parts[0]);

      minutes = parseInt(parts[1].replace('m', ''));
    } else if (parts.length === 1) {
      minutes = parseInt(parts[0].replace('m', ''));
    }

    sessionDate.setHours(sessionDate.getHours() + hours);
    sessionDate.setMinutes(sessionDate.getMinutes() + minutes);

    const formattedDate = moment(sessionDate, 'YYYY-MM-DD HH:mm').toDate();
    return moment(formattedDate).format('YYYY-MM-DD HH:mm');
  }

  //find sessions which are not completed
  async findNotCompletedSession(
    tutor_id: number,
    student_id: number,
    subject_id: number,
    end_date: Date,
  ): Promise<any> {
    const sessions = await this.tutorSessionRepository
      .createQueryBuilder('session')
      .leftJoin('session.student', 'student')
      .leftJoin('session.session_subject_id', 'subject')
      .leftJoin('session.user', 'user')
      .leftJoinAndMapMany(
        'session.to_do',
        ToDoEntity,
        'to_do',
        'session.id = to_do.session_id AND todo_type = 1',
      )
      .select([
        'session',
        'subject',
        'complete_session_id',
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
        'student.parent_id',
        'to_do',
      ])
      .where(
        'user.id = :user_id AND student.id = :id AND subject.id = :subject_id AND session.is_draft = :is_draft AND session.complete_session_id IS NULL',
        {
          user_id: tutor_id,
          id: student_id,
          subject_id: subject_id,
          is_draft: 1,
        },
      )
      .orderBy('session.session_date', 'ASC')
      .getMany();
    const sessionData = sessions.filter(
      (session) => session?.['to_do'].length === 0,
    );

    let end_session = {};
    for (const session of sessionData) {
      const sessionEndDate = await this.calculateSessionEndTime(
        session.session_date,
        session?.session_duration,
      );
      const endDate = await this.timezoneConvert.convertUtcDateTime(end_date);

      if (session?.session_date < endDate && sessionEndDate > endDate) {
        end_session = { session };
      }
    }
    return end_session?.['session'];
  }

  //find unconfirmed draft sessions
  async findDraftSessionData(): Promise<any> {
    const data = await this.tutorSessionDraftRepository
      .createQueryBuilder('sessionEdit')
      .leftJoin('sessionEdit.receive', 'receive')
      .leftJoin('sessionEdit.user', 'user')
      .leftJoin('sessionEdit.contact', 'contact')
      .leftJoin('sessionEdit.source_id', 'source_id')
      .leftJoin('user.role_id', 'user_role')
      .leftJoin('receive.role_id', 'receive_role')
      .leftJoin('contact.role_id', 'contact_role')
      .select([
        'sessionEdit',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.profile_image',
        'user_role.name',
        'receive.id',
        'receive.first_name',
        'receive.last_name',
        'receive_role.name',
        'receive.profile_image',
        'contact.id',
        'contact.first_name',
        'contact.last_name',
        'contact_role.name',
        'contact.profile_image',
        'source_id',
      ])
      .where('sessionEdit.status = :status', { status: 0 })
      .orderBy('sessionEdit.created_at', 'ASC')
      .getMany();

    const sessionDraft = [];
    const notificationPromises = data.map(async (session) => {
      const newSessionDate = session?.new_session_details?.['session_date'];
      if (newSessionDate) {
        const currentDate = new Date();
        const formattedCurrentDate =
          await this.timezoneConvert.convertUtcDateTime(currentDate);
        currentDate.setHours(currentDate.getHours() + 24);
        const currentTime = await this.timezoneConvert.convertUtcDateTime(
          currentDate,
        );

        if (
          formattedCurrentDate <= newSessionDate &&
          currentTime >= newSessionDate
        ) {
          // Send a notification
          await this.notificationService.sendSessionNotification(
            session?.id,
            session?.user?.['id'],
            session?.receive?.['id'],
            session?.source_id?.['id'],
            'unconfirmed_session_reminder',
            'NotificationType.UnconfirmedESessionReminder',
            'NotificationType.UnconfirmedESessionReminder',
          );
          sessionDraft.push({ session });
        }
      }
    });

    await Promise.all(notificationPromises);
    return sessionDraft;
  }

  //check draft session status on every 30 minutes
  @Cron('0 0/30 * * * *', { name: 'draft_session' })
  async handleCron() {
    this.findDraftSessionData();
  }
}

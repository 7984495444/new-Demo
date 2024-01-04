import { HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonSpaceEntity as LessonSpace } from '../entities/index';
import { Repository } from 'typeorm';
import axios from 'axios';
import { UserService } from '../user';
import { SubjectsService } from '../subjects/subjects.service';
import { LessonSpaceModel } from 'src/dto';
import { TutorSessionService } from '../tutor-session/tutor-session.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class LessonSpaceService {
  constructor(
    @InjectRepository(LessonSpace)
    private readonly LessonSpaceRepository: Repository<LessonSpace>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => SubjectsService))
    private readonly subjectsService: SubjectsService,
    @Inject(forwardRef(() => TutorSessionService))
    private readonly tutorSessionService: TutorSessionService,
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
  ) {}

  //find tutor space
  async findTutorSpace(
    creator_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const lessonSpace = await this.LessonSpaceRepository.createQueryBuilder(
      'lesson_space',
    )
      .select(['lesson_space'])
      .where(
        'lesson_space.creator_id = :creator_id AND lesson_space.student_id = :student_id AND lesson_space.subject_id = :subject_id',
        { creator_id, student_id, subject_id },
      )
      .getOne();
    if (!lessonSpace) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Please create lesson space for user ${creator_id}`,
        data: [],
      };
    }
    return lessonSpace;
  }

  //find space for student
  async findStudentSpace(
    creator_id: number,
    tutor_id: number,
    subject_id: number,
  ): Promise<any> {
    const lessonSpace = await this.LessonSpaceRepository.createQueryBuilder(
      'lesson_space',
    )
      .select(['lesson_space'])
      .where(
        'lesson_space.creator_id = :creator_id AND lesson_space.tutor_id = :tutor_id AND lesson_space.subject_id = :subject_id',
        { creator_id, tutor_id, subject_id },
      )
      .getOne();
    if (!lessonSpace) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Please create lesson space for user ${creator_id}`,
        data: [],
      };
    }
    return lessonSpace.link;
  }

  //find user space already exists
  async findUserSpace(
    creator_id: number,
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const lessonSpace = await this.LessonSpaceRepository.createQueryBuilder(
      'lesson_space',
    )
      .leftJoin('lesson_space.creator', 'creator')
      .leftJoin('lesson_space.student', 'student')
      .select([
        'lesson_space',
        'creator.id',
        'creator.first_name',
        'creator.last_name',
        'creator.email',
        'creator.profile_image',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.profile_image',
      ])
      .where(
        'lesson_space.creator = :creator_id AND lesson_space.tutor = :tutor_id AND lesson_space.student = :student_id AND lesson_space.subject = :subject_id',
        { creator_id, tutor_id, student_id, subject_id },
      )
      .getOne();
    if (!lessonSpace) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Please create lesson space for user ${creator_id}`,
        data: [],
      };
    }
    return lessonSpace;
  }

  //request data of users for generating links
  async findRequestData(
    creator_id: number,
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const user = await this.userService.findUserByIdWithRole(creator_id);
    const subject = await this.subjectsService.findOne(subject_id);

    const requestData = {
      id: `${subject?.name_en}-${tutor_id}-${student_id}`,
      user: {
        id: user?.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role_id?.['name'],
        leader: user.role_id?.['name'] !== 'student',
        custom_jwt_parameters: {
          meta: {
            displayName: `${user.first_name} ${user.last_name}`,
          },
        },
      },
      // holodeck_parameters: {
      //   customCloseUrl: `${process.env.NEXT_PUBLIC_API_URL}/lessonSpace/tutor_id=${tutor_id}/student_id=${student_id}/subject_id=${subject_id}`,
      //   customCloseName: 'Back to My Dashboard',
      //   customCloseAutomatic: 'false',
      // },
      webhooks: {
        session: {
          end: `${process.env.NEXT_PUBLIC_API_URL}/lesson-space/session-end`,
        },
      },
    };
    return requestData;
  }

  //create lesson space
  async create(lessonSpaceModel: LessonSpaceModel): Promise<any> {
    await this.LessonSpaceRepository.save(
      this.LessonSpaceRepository.create(lessonSpaceModel),
    );
  }

  //create tutor student links in same space
  async createUserLessonSpace(
    creator_id: number,
    tutor_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const findExistingSpace = await this.findUserSpace(
      creator_id,
      tutor_id,
      student_id,
      subject_id,
    );

    if (
      findExistingSpace &&
      findExistingSpace?.data &&
      findExistingSpace.data.length === 0
    ) {
      const requestData = await this.findRequestData(
        creator_id,
        tutor_id,
        student_id,
        subject_id,
      );

      try {
        const response = await axios.post(
          `${process.env.CREATE_LESSON_SPACE_URL}/v2/spaces/launch/`,
          requestData,
          {
            headers: {
              Authorization: `Organisation ${process.env.LESSON_SPACE_API_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        );
        await this.create({
          creator: creator_id,
          tutor: tutor_id,
          student: student_id,
          subject: subject_id,
          space_id: response.data?.room_id,
          link: response?.data?.client_url,
          space_name: requestData?.id,
          session_id: response.data?.session_id,
        });

        return response.data;
      } catch (error) {
        throw new Error(
          `Failed to create user's lesson space: ${error.message}`,
        );
      }
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: `Space already existed for user: ${creator_id}`,
      };
    }
  }

  //find organiztion id
  async getOrganiztionId(): Promise<any> {
    const organisation = await axios.get(
      `${process.env.CREATE_LESSON_SPACE_URL}/v2/my-organisation/`,
      {
        headers: {
          Authorization: `Organisation ${process.env.LESSON_SPACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return organisation.data.id;
  }

  //find organization's all sessions
  async getSessions(organization_id: number): Promise<any> {
    const response = await axios.get(
      `${process.env.CREATE_LESSON_SPACE_URL}/v2/organisations/${organization_id}/sessions/`,
      {
        headers: {
          Authorization: `Organisation ${process.env.LESSON_SPACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.results;
  }

  //find particular session recording
  async getSessionPlaybackUrl(
    creator_id: number,
    student_id: number,
    subject_id: number,
  ): Promise<any> {
    const session_id = await this.findTutorSpace(
      creator_id,
      student_id,
      subject_id,
    );
    const organization_id = await this.getOrganiztionId();
    const sessions = await this.getSessions(organization_id);
    const sessionsData = sessions.find(
      (session) => session.space.id === session_id?.space_id,
    );
    return sessionsData?.playback_url;
  }

  //find lessonspace using space id
  async findLessonSpace(space_id: string): Promise<any> {
    return await this.LessonSpaceRepository.createQueryBuilder('lesson_space')
      .leftJoin('lesson_space.creator', 'creator')
      .leftJoin('lesson_space.tutor', 'tutor')
      .leftJoin('lesson_space.student', 'student')
      .leftJoin('lesson_space.subject', 'subject')
      .select([
        'lesson_space',
        'tutor.id',
        'tutor.first_name',
        'tutor.last_name',
        'tutor.email',
        'tutor.profile_image',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.email',
        'student.profile_image',
        'subject',
      ])
      .where('lesson_space.space_id = :space_id', { space_id })
      .getOne();
  }

  //find data at session end and add session summary
  async addSessionEndSummary(space_id: string, end_date: Date): Promise<any> {
    const lesson_space = await this.findLessonSpace(space_id);

    const sessions = await this.tutorSessionService.findNotCompletedSession(
      lesson_space?.['tutor']?.id,
      lesson_space?.['student']?.id,
      lesson_space?.['subject']?.id,
      end_date,
    );

    if (sessions?.id) {
      await this.notificationService.sendSessionNotification(
        sessions?.id,
        sessions?.user?.['id'],
        sessions?.user?.['id'],
        sessions?.['id'],
        'tutor_add_session_summary',
        'Create session summary',
        // 'Faire un résumé de séance',
        'NotificationType.CreateASessionSummary',
      );
      return await this.notificationService.createAddSummary(sessions?.id, 1);
    }
  }
}

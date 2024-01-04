import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, SelectQueryBuilder } from 'typeorm';
import {
  NotificationEntity as Notification,
  ToDoEntity as ToDo,
  ToDoEntity,
} from '../entities/index';
import {
  NotificationModel,
  NotificationUpdateModel,
  ToDoModel,
} from '../dto/index';
import { TutorSessionService } from '../tutor-session/tutor-session.service';
import { UserService } from '../user';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(ToDo)
    private readonly toDoRepository: Repository<ToDo>,
    @Inject(forwardRef(() => TutorSessionService))
    private readonly tutorSessionService: TutorSessionService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(notificationModel: NotificationModel): Promise<Notification> {
    return await this.notificationRepository.save(notificationModel);
  }

  //update notification
  async updateNotification(id: number, edit_session: number): Promise<any> {
    return await this.notificationRepository.update(
      { id: id },
      {
        edit_session,
      },
    );
  }
  async updateNotificationStatus(
    id: number,
    notificationUpdateModel: NotificationUpdateModel,
  ): Promise<any> {
    return await this.notificationRepository.update(
      { edit_session: id },
      {
        ...notificationUpdateModel,
      },
    );
  }

  // update notification status using source
  async updateNotificationStatusUsingSourceId(
    id: number,
    notificationUpdateModel: NotificationUpdateModel,
  ): Promise<any> {
    return await this.notificationRepository.update(
      { source_id: id, edit_session: Not(0) },
      {
        ...notificationUpdateModel,
      },
    );
  }

  async findNotification(req, todo_type: number): Promise<any> {
    return await this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.sender', 'sender')
      .leftJoinAndSelect('notification.receiver', 'receiver')
      .leftJoinAndSelect('sender.role_id', 'sender_role')
      .leftJoinAndSelect('receiver.role_id', 'receiver_role')
      .leftJoinAndSelect('notification.source_id', 'source_id')
      .leftJoinAndSelect('source_id.student', 'student')
      .leftJoinAndSelect('source_id.user', 'tutor')
      .leftJoinAndSelect('source_id.session_subject_id', 'subject')
      .leftJoinAndMapOne(
        'notification.to_do',
        ToDoEntity,
        'to_do',
        'notification.source_id = to_do.session_id AND to_do.todo_type = :todo_type',
        { todo_type },
      )
      .leftJoin('to_do.student', 'to_do_student')
      .select([
        'notification',
        'source_id',
        'student.id',
        'student.first_name',
        'student.last_name',
        'student.profile_image',
        'student.parent_id',
        'tutor.id',
        'tutor.first_name',
        'tutor.last_name',
        'tutor.profile_image',
        'sender.id',
        'sender.email',
        'sender.first_name',
        'sender.last_name',
        'sender.profile_image',
        'sender_role',
        'sender.parent_id',
        'receiver.id',
        'receiver.email',
        'receiver.first_name',
        'receiver.last_name',
        'receiver.profile_image',
        'receiver_role',
        'receiver.parent_id',
        'to_do',
        'to_do_student.id',
        'to_do_student.first_name',
        'to_do_student.last_name',
        'to_do_student.profile_image',
        'to_do_student.parent_id',
        'subject',
      ])
      .where('notification.receiver_id = :id', {
        id: req.user.id,
      })
      .orderBy('notification.created_at', 'DESC')
      .getMany();
  }

  //find notification edit-session ids
  async findNotificationEditSession(
    id: number,
    source_type: string,
  ): Promise<any> {
    const notifications = await this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.source_id', 'source_id')
      .select(['notification.edit_session AS edit_session'])
      .where(
        'notification.source_id = :id AND notification.source_type = :source_type AND is_read = 0',
        {
          id,
          source_type,
        },
      )
      .getRawMany();
    const edit_session_ids = notifications.map(
      (notification) => notification.edit_session,
    );
    return edit_session_ids;
  }

  //find notification existed
  async findExistingNotification(
    sender_id: number,
    receiver_id: number,
    source_id: number,
    source_type: string,
  ): Promise<any> {
    return await this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.sender', 'sender')
      .leftJoinAndSelect('notification.receiver', 'receiver')
      .leftJoinAndSelect('notification.source_id', 'source_id')
      .select([
        'notification.id AS id',
        'notification.message_en AS message_en',
        'notification.message_fr AS message_fr',
        'notification.notification_type AS notification_type',
        'notification.source_type AS source_type',
        'notification.edit_session AS edit_session',
        'notification.is_read AS is_read',
        'notification.created_at AS created_at',
        'notification.updated_at AS updated_at',
        'source_id.id AS source_id',
        'receiver.id AS receiver',
        'sender.id AS sender',
      ])
      .where(
        'notification.sender_id = :sender_id AND notification.receiver_id = :receiver_id AND notification.source_id = :source_id AND notification.source_type = :source_type AND is_read != 1',
        {
          sender_id,
          receiver_id,
          source_id,
          source_type,
        },
      )
      .getRawOne();
  }

  async update(id: number): Promise<any> {
    const currentDate = new Date();
    const notificationModel = {
      created_at: currentDate,
    };
    return await this.notificationRepository.update(
      id,
      notificationModel as Partial<Notification>,
    );
  }

  //update delete session notification status
  async getNotificationBySourceId(
    sender_id: number,
    receiver_id: number,
    source_id: number,
  ): Promise<any> {
    const notification = await this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.sender', 'sender')
      .leftJoinAndSelect('notification.receiver', 'receiver')
      .leftJoinAndSelect('notification.source_id', 'source_id')
      .select([
        'notification.id AS id',
        'notification.message_en AS message_en',
        'notification.message_fr AS message_fr',
        'notification.notification_type AS notification_type',
        'notification.source_type AS source_type',
        'notification.edit_session AS edit_session',
        'notification.is_read AS is_read',
        'notification.created_at AS created_at',
        'notification.updated_at AS updated_at',
        'source_id.id AS source_id',
        'receiver.id AS receiver',
        'sender.id AS sender',
      ])
      .where(
        'notification.sender_id = :sender_id AND notification.receiver_id = :receiver_id AND notification.source_id = :source_id AND is_read != 1',
        {
          sender_id,
          receiver_id,
          source_id,
        },
      )
      .getRawOne();

    if (notification) {
      return await this.notificationRepository.update(
        { id: notification?.id },
        {
          is_read: 1,
        },
      );
    } else {
      throw new BadRequestException(
        `Notification with source_id ${source_id} not found`,
      );
    }
  }
  //get notification using sender_id, receiver_id, source_id
  async getNotification(
    sender_id: number,
    receiver_id: number,
    source_id: number,
  ): Promise<any> {
    return await this.notificationRepository
      .createQueryBuilder('notification')
      .where(
        'notification.sender_id = :sender_id AND notification.receiver_id = :receiver_id AND notification.source_id = :source_id AND is_closed = true',
        {
          sender_id,
          receiver_id,
          source_id,
        },
      )
      .getOne();
  }

  //close notification alert
  async closeNotificationAlert(
    sender_id: number,
    receiver_id: number,
    source_id: number,
  ): Promise<any> {
    const notification = await this.getNotification(
      sender_id,
      receiver_id,
      source_id,
    );

    if (notification) {
      return await this.notificationRepository.update(
        { id: notification?.id },
        {
          is_closed: false,
        },
      );
    } else {
      throw new BadRequestException(
        `Alert with source id ${source_id} not found`,
      );
    }
  }

  //update evaluation notification status
  async updateEvaluationNotification(
    id: number,
    notificationUpdateModel: NotificationUpdateModel,
  ): Promise<any> {
    return await this.notificationRepository.update(
      { id: id },
      {
        ...notificationUpdateModel,
      },
    );
  }

  //check session summary to do already exists
  async sessionSummaryExists(
    session_id: number,
    todo_type: number,
  ): Promise<any> {
    return await this.toDoRepository
      .createQueryBuilder('summary')
      .where(
        'summary.session_id = :session_id AND summary.todo_type = :todo_type',
        {
          session_id,
          todo_type,
        },
      )
      .getOne();
  }

  //create session summary todo
  async createAddSummary(session_id: number, todo_type: number): Promise<any> {
    const session = await this.tutorSessionService.findOne(session_id);
    const sessionSummary = await this.sessionSummaryExists(
      session?.id,
      todo_type,
    );

    if (!sessionSummary) {
      const toDoModel: ToDoModel = {
        session: Number(session.id),
        tutor: Number(session?.user?.['id']),
        student: Number(session.student?.['id']),
        subject: Number(session?.session_subject_id?.['id']),
        message_en: 'Session Summary',
        message_fr: 'NotificationType.SessionSummary',
        is_read: 0,
        todo_type: todo_type,
      };
      return await this.toDoRepository.save(toDoModel);
    } else {
      throw new BadRequestException(
        `Session Summary for session id ${session.id} already exists`,
      );
    }
  }

  //get to do list
  async getToDoList(user_id: number, search?: string): Promise<any> {
    const user = await this.userService.findUserByIdWithRole(user_id);
    const data = await this.toDoRepository
      .createQueryBuilder('summary')
      .leftJoin('summary.tutor', 'tutor')
      .leftJoin('tutor.role_id', 'tutor_role')
      .leftJoin('summary.student', 'student')
      .leftJoin('student.role_id', 'student_role')
      .leftJoin('summary.subject', 'subject')
      .leftJoin('summary.session', 'session')
      .select([
        'summary',
        'tutor.id',
        'tutor.email',
        'tutor.first_name',
        'tutor.last_name',
        'tutor.profile_image',
        'tutor_role',
        'student.id',
        'student.email',
        'student.first_name',
        'student.last_name',
        'student.profile_image',
        'student.parent_id',
        'student_role',
        'subject',
        'session',
      ]);

    let toDoList: SelectQueryBuilder<ToDo>;
    if (user?.role_id?.['id'] === 2) {
      const fullNameQuery =
        "(tutor.first_name || ' ' || tutor.last_name) ILIKE :search";
      toDoList = await data
        .where(
          `summary.tutor_id = :user_id AND summary.is_read = :is_read AND ((summary.message_en = :message1 AND summary.todo_type = :type1) OR (summary.message_en = :message2 AND summary.todo_type = :type2)) AND ${fullNameQuery}`,
          {
            user_id,
            is_read: 0,
            message1: 'Session Summary',
            type1: 1,
            message2: 'Follow-up Report',
            type2: 2,
            search: `%${search}%`,
          },
        )
        .orderBy('summary.created_at', 'DESC');
    } else {
      const fullNameQuery =
        "(student.first_name || ' ' || student.last_name) ILIKE :search";
      toDoList = await data
        .where(
          `summary.student_id = :user_id AND summary.todo_type = 2 AND ${fullNameQuery}`,
          {
            user_id,
            search: `%${search}%`,
          },
        )
        .orderBy('summary.is_read', 'ASC')
        .addOrderBy('summary.created_at', 'DESC');
    }
    return toDoList.getMany();
  }

  //check follow up report todo already exists
  async sessionFollowupExists(session_id: number): Promise<any> {
    return await this.toDoRepository
      .createQueryBuilder('summary')
      .where(
        'summary.session_id = :session_id AND summary.message_fr = :message_fr AND summary.todo_type = 2',
        {
          session_id,
          message_fr: 'Rapport de suivi',
        },
      )
      .getOne();
  }

  //create followup report notification
  async addFollowUpReportNotification(
    sender_id: number,
    receive_id: number,
    session_id: number,
    source_type: string,
    message_fr: string,
  ): Promise<any> {
    const notificationModel = {
      receiver: receive_id,
      message_en: 'Follow-up Report',
      message_fr: message_fr,
      notification_type: ['New matches are proposed', 'Visual dot'],
      source_id: session_id, //    SESSION id
      source_type: source_type,
      edit_session: 0,
      is_read: 0,
      is_closed: true,
    };
    const notificationtData = {
      ...notificationModel,
      sender: sender_id,
    };
    return await this.create(notificationtData);
  }

  //create followup report todo
  async addFollowUpReport(session_id: number): Promise<any> {
    const session = await this.tutorSessionService.findOne(session_id);
    const sessionFollowupReport = await this.sessionFollowupExists(session_id);

    const completed_session = await this.tutorSessionService.getSessionIds(
      session?.user?.['id'],
      session.student?.['id'],
      session?.session_subject_id?.['id'],
    );

    const old_count =
      completed_session[completed_session.length - 2]?.todo_count || 0;

    const totalHours = await this.tutorSessionService.getSessionTotalTutoring(
      session?.user?.['id'],
      session?.student?.['id'],
      session?.session_subject_id?.['id'],
    );
    const new_count = Math.floor(totalHours / 10);

    await this.tutorSessionService.update(session_id, {
      todo_count: new_count,
    });

    const toDoModel: ToDoModel = {
      session: Number(session_id),
      tutor: Number(session?.user?.['id']),
      student: Number(session.student?.['id']),
      subject: Number(session?.session_subject_id?.['id']),
      message_en: 'Follow-up Report',
      message_fr: 'NotificationType.FollowUpReportStudentTodoList',
      // message_fr: 'Rapport de suivi',
      is_read: 0,
      todo_type: 2,
    };

    if (!sessionFollowupReport && new_count != old_count) {
      await this.addFollowUpReportNotification(
        Number(session?.user?.['id']),
        Number(session?.user?.['id']),
        session_id,
        'tutor_follow_up',
        'NotificationType.FollowUpReportTutor',
      );
      await this.addFollowUpReportNotification(
        Number(session?.user?.['id']),
        Number(session?.student?.['id']),
        session_id,
        'student_follow_up',
        'NotificationType.FollowUpReport',
      );
      await this.addFollowUpReportNotification(
        Number(session?.user?.['id']),
        Number(session?.student?.['parent_id']),
        session_id,
        'parent_follow_up',
        'NotificationType.FollowUpReport',
      );
      return await this.toDoRepository.save(toDoModel);
    }
  }

  async findOne(session_id: number, todo_type: number): Promise<ToDo> {
    return await this.toDoRepository
      .createQueryBuilder('todo')
      .leftJoin('todo.session', 'session')
      .leftJoin('todo.tutor', 'tutor')
      .leftJoin('todo.student', 'student')
      .leftJoin('todo.subject', 'subject')
      .select([
        'todo',
        'session',
        'tutor.id',
        'tutor.email',
        'tutor.first_name',
        'tutor.last_name',
        'tutor.profile_image',
        'student.id',
        'student.email',
        'student.first_name',
        'student.last_name',
        'student.profile_image',
        'subject',
      ])
      .where('todo.session_id = :session_id AND todo.todo_type = :todo_type', {
        session_id,
        todo_type,
      })
      .getOne();
  }

  //update todo status using todo id
  async updateTodoStatus(todo_id: number): Promise<any> {
    return await this.toDoRepository.update(todo_id, {
      is_read: 1,
    });
  }

  //update notification which is read from todo
  async updateTodoNotification(
    sender_id: number,
    receiver_id: number,
    source_id: number,
  ): Promise<any> {
    const notification = await this.getNotification(
      sender_id,
      receiver_id,
      source_id,
    );

    if (notification) {
      return await this.notificationRepository.update(
        { id: notification?.id },
        {
          is_read: 1,
        },
      );
    } else {
      throw new BadRequestException(
        `Alert with source id ${source_id} not found`,
      );
    }
  }

  //send notification for session
  async sendSessionNotification(
    edit_session: number,
    sender_id: number,
    receive_id: number,
    session_id: number,
    source_type: string,
    message_en: string,
    message_fr: string,
  ): Promise<any> {
    const notificationModel = {
      receiver: receive_id,
      message_en: message_en,
      message_fr: message_fr,
      notification_type: ['New matches are proposed', 'Visual dot'],
      source_id: session_id,
      source_type: source_type,
      edit_session: edit_session,
      is_read: 0,
      is_closed: true,
    };
    const notificationtData = {
      ...notificationModel,
      sender: sender_id,
    };
    const existingNotification = await this.findExistingNotification(
      sender_id,
      notificationModel.receiver,
      notificationModel.source_id,
      source_type,
    );
    if (!existingNotification) {
      return await this.create(notificationtData);
    }
  }
}

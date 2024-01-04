import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompleteSessionEntity as ComplateSession } from '../entities/index';
import { Repository } from 'typeorm';
import { CompleteSessionModel } from '../dto/index';
import { TutorSessionService } from '../tutor-session/tutor-session.service';
import { LessonSpaceService } from '../lesson_space/lesson_space.service';

@Injectable()
export class CompleteSessionService {
  constructor(
    @InjectRepository(ComplateSession)
    private readonly complateSessionRepository: Repository<ComplateSession>,
    private readonly tutorSessionService: TutorSessionService,
    private readonly lessonSpaceService: LessonSpaceService,
  ) {}
  async create(completeSessionModel: CompleteSessionModel) {
    const session = await this.tutorSessionService.findOne(
      completeSessionModel.session_id,
    );

    const session_playback_url =
      await this.lessonSpaceService.getSessionPlaybackUrl(
        session.user?.['id'], //creator_id
        session.student?.['id'], //student_id
        session.session_subject_id?.['id'], //subject_id
      );

    if (completeSessionModel.type === 'confirm_session') {
      completeSessionModel['session_recording'] = session_playback_url;
    }

    return await this.complateSessionRepository.save(
      this.complateSessionRepository.create(completeSessionModel),
    );
  }

  async findAll() {
    return await this.complateSessionRepository.find();
  }

  async findOne(id: number) {
    return await this.complateSessionRepository.findOneBy({ id: id });
  }

  async update(id: number, completeSessionModel: CompleteSessionModel) {
    return await this.complateSessionRepository.update(id, {
      ...completeSessionModel,
    });
  }

  async remove(id: number) {
    return await this.complateSessionRepository.delete(id);
  }

  //get complete session details
  async getCompleteSessionDetails(complete_session_id: number): Promise<any> {
    const complete_session = await this.findOne(complete_session_id);

    if (complete_session) {
      const session = await this.tutorSessionService.findOne(
        complete_session.session_id,
      );
      return {
        complete_session_id: complete_session?.id,
        session_date: session?.session_date,
        subject_name_en: session?.session_subject_id?.['name_en'],
        subject_name_fr: session?.session_subject_id?.['name_fr'],
        program_name_en: session?.session_subject_id?.['name_en'],
        program_name_fr: session?.session_subject_id?.['name_fr'],
        status: complete_session?.type,
        document_name: complete_session?.document_name,
        duration: complete_session?.duration,
        session_recording: complete_session?.session_recording,
        reason_for_cancellation: complete_session?.reason_for_cancellation,
        dating_summary: complete_session?.dating_summary,
        next_meeting_summary: complete_session?.next_meeting_summary,
        additional_notes: session?.session_description,
      };
    } else {
      throw new BadRequestException('Session not found');
    }
  }
}

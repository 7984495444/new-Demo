import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TutorDocumentEntity as TutorDocument } from 'src/entities';
import { Repository } from 'typeorm';
import { TutorDocumentModel } from '../dto/index';

@Injectable()
export class TutorDocumentService {
  constructor(
    @InjectRepository(TutorDocument)
    private readonly tutorDocumentRepository: Repository<TutorDocument>,
  ) {}

  async create(tutorDocumentModel: TutorDocumentModel): Promise<TutorDocument> {
    return await this.tutorDocumentRepository.save(tutorDocumentModel);
  }

  async findOne(id: number): Promise<any> {
    return await this.tutorDocumentRepository
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.user', 'user')
      .select([
        'document',
        'user.id',
        'user.email',
        'user.first_name',
        'user.last_name',
        'user.profile_image',
      ])
      .where('document.user_id = :id', { id })
      .getOne();
  }

  async findIdentityDocuments(id: number): Promise<any> {
    const document = await this.tutorDocumentRepository
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.user', 'user')
      .select(['document.identity_documents'])
      .where('document.user_id = :id', { id })
      .getOne();
    const document_face = document?.identity_documents[0]?.['document_face'];
    const document_back =
      document?.identity_documents[0]?.['document_back'] ||
      document?.identity_documents[1]?.['document_back'];
    return { document_face, document_back };
  }

  async update(id, tutorDocumentModel): Promise<any> {
    return await this.tutorDocumentRepository
      .createQueryBuilder()
      .update('tutor_document')
      .set({ ...tutorDocumentModel })
      .where('tutor_document.user_id = :id', { id })
      .execute();
  }
}

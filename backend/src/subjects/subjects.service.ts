import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity as Subject } from 'src/entities/subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}
  async findAll(): Promise<any> {
    return await this.subjectRepository.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.subjectRepository.findOne({ where: { id } });
  }
}

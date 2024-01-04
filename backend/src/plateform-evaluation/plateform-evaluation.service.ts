import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlateformEvaluationModel } from '../dto/index';
import { PlateformEvaluationEntity as PlateformEvaluation } from '../entities/index';

@Injectable()
export class PlateformEvaluationService {
  constructor(
    @InjectRepository(PlateformEvaluation)
    private readonly plateformEvaluationRepository: Repository<PlateformEvaluation>,
  ) {}

  async createPlateformEvaluation(
    plateformEvaluationModel: PlateformEvaluationModel,
    id: number,
  ): Promise<PlateformEvaluation> {
    plateformEvaluationModel['user'] = id;
    return await this.plateformEvaluationRepository.save(
      plateformEvaluationModel,
    );
  }

  async findAll(): Promise<any> {
    return await this.plateformEvaluationRepository
      .createQueryBuilder('evaluation')
      .select([
        'evaluation',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.profile_image',
        'user.email',
      ])
      .leftJoin('evaluation.user', 'user')
      .getMany();
  }
}

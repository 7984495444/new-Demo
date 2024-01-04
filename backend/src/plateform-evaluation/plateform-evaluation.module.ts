import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateformEvaluationController } from './plateform-evaluation.controller';
import { PlateformEvaluationService } from './plateform-evaluation.service';
import { PlateformEvaluationEntity } from '../entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([PlateformEvaluationEntity])],
  controllers: [PlateformEvaluationController],
  providers: [PlateformEvaluationService],
})
export class PlateformEvaluationModule {}

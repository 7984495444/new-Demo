import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './index';

@Entity('plateform_evaluation')
export class PlateformEvaluationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @Column()
  grades: string;

  @Column()
  motivation: string;

  @Column()
  self_esteem: string;

  @Column()
  recommend_school: string;

  @Column()
  general_comments: string;
}

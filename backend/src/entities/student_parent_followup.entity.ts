import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { SubjectEntity, UserEntity } from './index';

@Entity('student_parent_follow_up')
export class StudentParentFollowUpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'parent_id' })
  parent: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'tutor_id' })
  tutor: number;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: number;

  @CreateDateColumn()
  created_at;

  @Column()
  general_appreciation: number;

  @Column()
  assessment_accessible: string;

  @Column()
  good_bond: number;

  @Column()
  pleasant_climate: number;

  @Column()
  attentive_tutor: number;

  @Column()
  comfortable_subject: number;

  @Column()
  informed_progress: number;

  @Column()
  useful_suggestions: number;

  @Column()
  well_prepared: number;

  @Column()
  punctual_tutor: number;

  @Column({ nullable: true })
  general_comments: string;

  @Column({ nullable: true, type: 'float' })
  star_rating: number;

  get rating(): number {
    const total_score =
      this.general_appreciation +
      this.good_bond +
      this.pleasant_climate +
      this.attentive_tutor +
      this.comfortable_subject +
      this.informed_progress +
      this.useful_suggestions +
      this.well_prepared +
      this.punctual_tutor;
    const average_score = total_score / 9;
    return average_score / 2;
  }
}

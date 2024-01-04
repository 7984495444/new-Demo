import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { SubjectEntity, UserEntity } from './index';

@Entity('tutor_follow_up')
export class TutorFollowUpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: number;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: number;

  @CreateDateColumn()
  created_at;

  @Column()
  grade: string;

  @Column()
  subjects: string;

  @Column()
  is_attentive: number;

  @Column()
  does_homework: number;

  @Column()
  is_motivated: number;

  @Column()
  is_organized: number;

  @Column()
  brings_equipment: number;

  @Column()
  ask_questions: number;

  @Column()
  respect_schedule: number;

  @Column()
  no_of_meeting: string;

  @Column()
  length_of_session: string;

  @Column()
  concentration_level_duration: string;

  @Column()
  session_duration_suggestion: string;

  @Column()
  progress_of_student: string;

  @Column()
  points_to_work: string;

  @Column({ nullable: true, type: 'float' })
  progress_percentage: number;

  // get progress_towards_goal(): number {
  //   const total_progress =
  //     this.is_attentive +
  //     this.does_homework +
  //     this.is_motivated +
  //     this.is_organized +
  //     this.brings_equipment +
  //     this.ask_questions +
  //     this.respect_schedule;
  //   const average_progress = (total_progress / 7) * 10;
  //   return average_progress;
  // }
}

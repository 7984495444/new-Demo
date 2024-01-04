import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubjectEntity, UserEntity } from './index';

@Entity('lesson_space')
export class LessonSpaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'tutor_id' })
  tutor: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: number;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: number;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  space_name: string;

  @Column({ nullable: true })
  space_id: string;

  @Column({ nullable: true })
  session_id: string;
}

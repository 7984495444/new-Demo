import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubjectEntity, TutorSessionEntity, UserEntity } from './index';

@Entity('to_do')
export class ToDoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TutorSessionEntity)
  @JoinColumn({ name: 'session_id' })
  session: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'tutor_id' })
  tutor: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: number;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: number;

  @Column()
  message_en: string;

  @Column()
  message_fr: string;

  @Column({ default: 0 })
  is_read: number;

  @Column()
  todo_type: number;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { SubjectEntity, UserEntity } from './index';

@Entity('student_program')
export class StudentProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'tutor_id' })
  tutor: number;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: number;

  @Column()
  total_session: number;

  @CreateDateColumn()
  created_at;
}

import { IsDateString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import {
  SubjectEntity,
  UserEntity,
  MySchoolLevelSubjectsEntity,
} from './index';

@Entity('tutor_session')
export class TutorSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: number;

  @Column()
  session_duration: string;

  @Column()
  session_time: string;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  session_subject_id: number;

  @Column({ default: null })
  session_description: string;

  @Column({ default: null })
  reason_for_modification: string;

  @Column({ default: null })
  complete_session_id: string;

  // @Column({ type: 'timestamp' })
  @Column()
  session_date: string;

  @Column({ default: null })
  IsDelete: Date;

  @Column({ default: null })
  note: string;

  @Column({ default: 0 })
  todo_count: number;

  @Column({ default: 0 }) //is_draft 0 = not_accepted, 1 = accepted, 2 = refuse
  is_draft: number;

  @CreateDateColumn()
  created_at;
}

@Entity('tutor_document')
export class TutorDocumentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
  })
  identity_documents: Array<object>;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
  })
  university_proof: Array<object>;

  @Column()
  backgroundcheck_proof: string;

  @Column({ default: 0 })
  transit_no: number;

  @Column({ default: 0 })
  institution_no: number;

  @Column({ type: 'bigint', default: 0 })
  account_no: number;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}

@Entity('tutor_student')
export class TutorStudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: number;

  @ManyToOne(() => SubjectEntity, { nullable: true })
  @JoinColumn({ name: 'subject_id' })
  subject: number;

  @Column({ default: null })
  confirmation: boolean;

  @Column({ default: null })
  raison_for_refuse: string;

  @Column({ default: null })
  note: string;
}

@Entity('student_attendance')
export class StudentAttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @Column({ type: 'timestamp', default: null })
  @IsDateString()
  attendance_date: Date;

  @Column()
  attendance_type: number;
}

@Entity('tutor_student_match')
export class TutorStudentMatchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: number;

  @ManyToOne(() => MySchoolLevelSubjectsEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: number;

  @Column({ default: null })
  total_score: number;

  @Column({ default: 0 })
  is_completed: number;
}

@Entity('tutor_student_match_draft')
export class TutorStudentMatchDraftEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: number;

  @ManyToOne(() => MySchoolLevelSubjectsEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: number;

  @Column({ default: 0 })
  language: number;

  @Column({ default: 0 })
  school_level: number;

  @Column({ default: 0 })
  level_lesson: number;

  @Column({ default: 0 })
  same_schedule: number;

  @Column({ default: 0 })
  length_of_lessons: number;

  @Column({ default: 0 })
  frequency_of_lessons: number;

  @Column({ default: 0 })
  learning_issues: number;

  @Column({ default: 0 })
  interests: number;

  @Column({ default: 0 })
  tutor_activation_bonus: number;

  @Column({ default: 0 })
  workload_varience: number;
}

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('complete_session')
export class CompleteSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ default: null })
  duration: string;

  @Column({ default: null })
  dating_summary: string;

  @Column({ default: null })
  next_meeting_summary: string;

  @Column({ default: null })
  reason_for_cancellation: string;

  @Column({ default: null })
  document_name: string;

  @Column()
  session_id: number;

  @Column({ default: null })
  cancel_session_userId: number;

  @Column({ default: null })
  session_recording: string;

  @Column({ default: 0 })
  is_approved: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity, TutorSessionEntity } from './index';

@Entity('tutor_session_draft')
export class TutorSessionDraftEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'receive_id' })
  receive: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'contact_id' })
  contact: number;

  @ManyToOne(() => TutorSessionEntity, { nullable: true })
  @JoinColumn({ name: 'source_id' })
  source_id: number;

  @Column({ default: 0 }) //(confirm=1, refused=2)
  status: number;

  @Column({
    type: 'jsonb',
    array: false,
    default: {},
    nullable: false,
  })
  new_session_details: object;

  @Column({
    type: 'jsonb',
    array: false,
    default: {},
    nullable: false,
  })
  old_session_details: object;

  @Column({ default: null })
  reason_for_refusal: string;

  @Column({ default: null })
  note: string;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}

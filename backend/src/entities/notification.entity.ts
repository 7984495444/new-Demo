import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity, TutorSessionEntity } from './index';

@Entity('notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'sender_id' })
  sender: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'receiver_id' })
  receiver: number;

  @Column()
  message_en: string;

  @Column()
  message_fr: string;

  @Column('simple-array')
  notification_type: string[];

  @Column({ default: 0 }) // 0 unread, 1 read
  is_read: number;

  @Column({ default: true })
  is_closed: boolean;

  @Column()
  source_type: string;

  // @Column({ default: null })
  @ManyToOne(() => TutorSessionEntity, { nullable: true })
  @JoinColumn({ name: 'source_id' })
  source_id: number;

  @Column({ default: null })
  edit_session: number;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}

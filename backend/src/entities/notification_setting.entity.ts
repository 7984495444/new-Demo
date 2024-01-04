import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('notification_setting')
export class NotificationSettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @Column({ default: false })
  new_matches_are_proposed: boolean;

  @Column({ default: false })
  updates_on_current_matches: boolean;

  @Column({ default: false })
  admin_messages: boolean;

  @Column({ default: false })
  new_eleves_on_the_platform: boolean;

  @Column({ default: false })
  Invitations_to_events: boolean;

  @Column({ default: false })
  terms_and_conditions_updates: boolean;

  @Column({ default: false })
  platform_notifications_only: boolean;

  @Column({ default: false })
  email: boolean;

  @Column({ default: false })
  sms: boolean;

  @Column({ default: false })
  sound_only: boolean;

  @Column({ default: false })
  visual_dot: boolean;

  @Column({ default: false })
  show_notification_model: boolean;
}

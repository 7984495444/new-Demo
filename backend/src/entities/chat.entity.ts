import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('chat_message')
export class ChatMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChatEntity)
  @JoinColumn({ name: 'chat_id' })
  chat_id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column()
  message_type: string;

  @Column({ default: null })
  message: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
  })
  video_thumb: Array<object>;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
  })
  attachment: Array<object>;

  @Column({ default: 0 })
  isSeen: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('chat')
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user1_id: number;

  @Column()
  user2_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

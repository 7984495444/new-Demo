import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('stripe_card')
export class StripeCardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @Column()
  stripe_user_id: string;

  @Column()
  stripe_card_id: string;

  @Column()
  card_no: number;

  @Column({ length: 255 })
  card_holder_name: string;

  @Column()
  cvc: number;

  @Column({ type: 'varchar', length: 5 })
  exp_date: string;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('payment_deduction')
export class PaymentDeductionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'tutor_id' })
  tutor_id: number;

  @Column()
  session_date: Date;

  @Column()
  payment_details: string;

  @Column()
  payment_status: string;

  @Column()
  amount: number;
}

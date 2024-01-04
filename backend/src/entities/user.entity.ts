// import { Transform } from 'class-transformer';
import { IsDateString } from 'class-validator';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  profile_image: string;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id' })
  role_id: number;

  // user login status
  @Column({ default: 0 })
  active: number;

  // for chat
  @Column({ default: 0 })
  isActive: number;

  @Column({ default: 1 })
  gender: number;

  @Column({ type: 'timestamp', default: null })
  @IsDateString()
  dob: Date;

  @Column({ default: null })
  phone_no: string;

  @Column({ default: null })
  token: string;

  @Column({ default: null })
  parent_id: number;

  @Column({ default: null })
  address: string;

  @Column({ default: null })
  language: string;

  @Column({ default: null })
  apartment: string;

  @Column({ default: null })
  zip: string;

  @Column({ default: null })
  province: string;

  @Column({ default: 0 })
  social_insurance_number: number;

  @Column({ default: null })
  school_level: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subject')
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name_en: string;

  @Column({ nullable: true })
  name_fr: string;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}

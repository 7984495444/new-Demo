import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MySchoolLevelsEntity } from './index';

@Entity('my_school_level_subjects')
export class MySchoolLevelSubjectsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MySchoolLevelsEntity)
  @JoinColumn({ name: 'setting_no' })
  setting_no: number;

  @Column()
  name_en: string;

  @Column()
  name_fr: string;

  @Column({ nullable: true })
  @Generated('increment')
  setting_value: number;

  @Column()
  order_no: number;

  @BeforeInsert()
  ensureSettingValue() {
    if (this.setting_value === null || this.setting_value === undefined) {
      this.setting_value = 1;
    }
  }
}

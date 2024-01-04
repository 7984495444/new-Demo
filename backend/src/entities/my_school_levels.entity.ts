import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('my_school_levels')
export class MySchoolLevelsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_en: string;

  @Column()
  name_fr: string;
}

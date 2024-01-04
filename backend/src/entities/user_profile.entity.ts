import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './index';

@Entity('user_profile')
export class UserProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @Column({ default: null })
  who_am_i: string;

  @Column({
    type: 'jsonb',
    default: [
      { monday: ['Aucune disponibilité'] },
      { tuesday: ['Aucune disponibilité'] },
      { wednesday: ['Aucune disponibilité'] },
      { thursday: ['Aucune disponibilité'] },
      { friday: ['Aucune disponibilité'] },
      { saturday: ['Aucune disponibilité'] },
      { sunday: ['Aucune disponibilité'] },
    ],
  })
  regular_availability: Array<object>;

  @Column({
    type: 'jsonb',
    default: {
      status: false,
      start_date: '',
      end_date: '',
      weekDays: [
        { monday: ['Aucune disponibilité'] },
        { tuesday: ['Aucune disponibilité'] },
        { wednesday: ['Aucune disponibilité'] },
        { thursday: ['Aucune disponibilité'] },
        { friday: ['Aucune disponibilité'] },
        { saturday: ['Aucune disponibilité'] },
        { sunday: ['Aucune disponibilité'] },
      ],
    },
  })
  special_availability: object;

  @Column({
    type: 'jsonb',
    default: {
      Kindergarten: [],
      primary: {
        '1st year': [],
        '2nd year': [],
        '3rd year': [],
        '4th year': [],
        '5th year': [],
        '6th year': [],
      },
      secondary: {
        'Secondary 1': [],
        'Secondary 2': [],
        'Secondary 3': [],
        'Secondary 4': [],
        'Secondary 5': [],
      },
      Cegep: [],
    },
  })
  levels_and_subjects: object;

  @Column({
    type: 'jsonb',
    default: {
      attention_deficit: 0,
      dyslexia: 0,
      dysortography: 0,
      dyscalculia: 0,
      dysphasia: 0,
      dyspraxia: 0,
      memory_problems: 0,
      asperger_syndrome: 0,
      autism_spectrum_disorder: 0,
      tourette_syndrome: 0,
    },
  })
  difficulties: object;

  @Column({
    type: 'jsonb',
    default: {
      shy: 0,
      curious: 0,
      bavard: 0,
      distracted: 0,
      sociable: 0,
      calme: 0,
      creative: 0,
      sense_of_mood: 0,
    },
  })
  personality: object;

  @Column({
    type: 'jsonb',
    default: {
      sports: 0,
      art: 0,
      music: 0,
      photography: 0,
      video_game: 0,
      reading: 0,
      animals: 0,
      technology: 0,
      movie: 0,
      kitchen: 0,
      journey: 0,
      fashion: 0,
    },
  })
  interests: object;

  @Column({
    type: 'jsonb',
    default: [
      { job_title: '', school_name: '', joining_date: '', end_date: '' },
    ],
  })
  education: Array<object>;

  @Column({
    type: 'jsonb',
    default: [
      {
        experience_title: '',
        institution: '',
        joining_date: '',
        end_date: '',
      },
    ],
  })
  professional_experience: Array<object>;

  @Column({ default: null })
  tutoring_experience: string;

  @Column({ default: null })
  experiences_with_children: string;

  @Column({
    type: 'jsonb',
    default: {
      my_school: '',
      authorization: false,
      teachers: [],
    },
  })
  school_name: object;

  @Column({
    type: 'jsonb',
    default: {
      matter: [],
      frequency: '',
      duration: '',
      support: false,
      catch_up: false,
      preparing_for_exam: false,
      enrichment: false,
      exam_date: '',
      more_details_on_materials: '',
    },
  })
  my_needs: object;

  @Column({
    type: 'jsonb',
    default: {
      status: {
        attention_deficit: 0,
        dyslexia: 0,
        dysortography: 0,
        dyscalculia: 0,
        dysphasia: 0,
        dyspraxia: 0,
        memory_problems: 0,
        asperger_syndrome: 0,
        autism_spectrum_disorder: 0,
        tourette_syndrome: 0,
      },
      followBy: {
        remedial_teacher: 0,
        speech_therapist: 0,
        occupational_therapist: 0,
      },
    },
  })
  followed_by: object;

  @Column({
    type: 'jsonb',
    default: {
      i: {
        demonstrates_ability_to_concentrate: 0,
        motivated_at_school: 0,
        interested_in_school_subjects: 0,
        pay_attention_in_class: 0,
        enjoy_new_challenges: 0,
        expresses_ideas_well: 0,
        class_question_section: 0,
        describe_subject: '',
      },
      relation: { relationship_with_teacher: 0 },
      situation: {
        currently_in_situation_failure: 0,
      },
      describe_subjects_targeted_by_failure: '',
    },
  })
  at_school: object;

  @Column({ nullable: true, default: 0 })
  no_of_students: number;

  @Column({ type: 'integer', default: 1 })
  language: number;
  [x: string]: any;
}

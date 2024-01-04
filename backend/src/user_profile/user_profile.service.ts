import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileEntity as UserProfile } from '../entities/index';
import { UserProfileModel } from '../dto/index';
import { UserService } from '../user/user.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { TutorStudentService } from 'src/tutor-student/tutor-student.service';
// import { TutorStudentSubjectService } from '../tutor_student_subject/tutor_student_subject.service';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly UserProfileRepository: Repository<UserProfile>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    // private readonly tutorStudentSubjectService: TutorStudentSubjectService,
    @InjectQueue('tutorStudentMatch')
    private readonly updateUserProfileQueue: Queue,
    @Inject(forwardRef(() => TutorStudentService))
    private readonly tutorStudentService: TutorStudentService,
  ) {}

  async updateProfile(
    id: number,
    userProfileModel: UserProfileModel,
  ): Promise<any> {
    return await this.UserProfileRepository.createQueryBuilder()
      .update('user_profile')
      .set({ ...userProfileModel })
      .where('user_id = :id', { id })
      .execute();
  }

  async findMatches(id: number): Promise<any> {
    const user = await this.userService.findUserByIdWithRole(id);
    if (user.role_id?.['id'] === 2) {
      if (process.env.NEXT_PUBLIC_DEVELOPMENT_TYPE === 'local') {
        await this.updateUserProfileQueue.add('findMatchingStudents', { id });
      } else {
        await this.tutorStudentService.findMatchingStudents(id);
      }
    } else {
      const student_lessons = (await this.findStudentNotLinkedLessons(id))
        ?.my_needs?.matter;
      const not_linked = await this.tutorStudentService.findNotLinkedStudents(
        id,
        student_lessons,
      );
      const tutors = await this.userService.getAllTutors(not_linked);
      tutors.map(async (tutor: number) => {
        if (process.env.NEXT_PUBLIC_DEVELOPMENT_TYPE === 'local') {
          await this.updateUserProfileQueue.add('findMatchingStudents', {
            tutor,
          });
        } else {
          await this.tutorStudentService.findMatchingStudents(tutor);
        }
      });
    }
  }

  //update user profile
  async update(id: number, userProfileModel: UserProfileModel): Promise<any> {
    const user = await this.userService.findUserByIdWithRole(id);

    // const subjectIds = userProfileModel['language'];
    // if (user && user.role_id?.['id'] === 2 && subjectIds) {
    //   await this.tutorStudentSubjectService.addTutorSubject(id, subjectIds);
    // } else if (user && user.role_id?.['id'] === 4 && subjectIds) {
    //   await this.tutorStudentSubjectService.addStudentSubject(id, subjectIds);
    // }

    const user_profile = await this.findByUserId(id);
    if (user_profile?.data && user_profile.data.length === 0 && user) {
      userProfileModel['user'] = id;
      await this.UserProfileRepository.save(
        this.UserProfileRepository.create(userProfileModel),
      );

      await this.findMatches(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile Updated Successfully',
      };
    } else if (user_profile) {
      userProfileModel['user'] = id;
      const profile = await this.updateProfile(id, userProfileModel);

      await this.findMatches(id);

      return profile;
    } else {
      throw new BadRequestException(`User with id ${id} not found`);
    }
  }

  //get tutor's no-of-students
  async getTutorTotalStudents(tutor_id: number): Promise<any> {
    return await this.UserProfileRepository.createQueryBuilder('user_profile')
      .select('user_profile')
      .where('user_profile.user_id = :tutor_id', { tutor_id })
      .getOne();
  }

  //get user's profile details
  async findByUserId(id: number): Promise<any> {
    const profile = await this.UserProfileRepository.createQueryBuilder(
      'user_profile',
    )
      .leftJoin('user_profile.user', 'user')
      .leftJoin('user.role_id', 'role_id')
      .select([
        'user_profile',
        'user.id',
        'user.email',
        'user.first_name',
        'user.last_name',
        'user.profile_image',
        'user.address',
        'user.dob',
        'user.language',
        'user.school_level',
        'role_id',
        'user.parent_id',
      ])
      .where('user_profile.user_id = :id', {
        id,
      })
      .getOne();
    const user = await this.userService.findUserByIdWithRole(id);
    if (user?.role_id?.['id'] === 2) {
      const tutor_student =
        (await this.tutorStudentService.findTutorStudentIds(id)) || 0;
      profile.tutor_student = tutor_student.length;
    }
    if (!profile) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Please update the profile',
        data: [],
      };
    }
    return profile;
  }

  //update student level lesssons
  async updateMatterForUserId(userId: number): Promise<any> {
    const userProfile = await this.findByUserId(userId);
    if (userProfile) {
      userProfile.my_needs.matter = [];
      return await this.UserProfileRepository.save(userProfile);
    }
    return null;
  }

  //find user's regular availability
  async findUserAvailability(id: number): Promise<any> {
    const profile = await this.UserProfileRepository.createQueryBuilder(
      'user_profile',
    )
      .leftJoin('user_profile.user', 'user')
      .leftJoin('user.role_id', 'role_id')
      .select(['user_profile.regular_availability AS regular_availability'])
      .where('user_profile.user_id = :id', {
        id,
      })
      .getRawOne();
    const availability = profile.regular_availability.filter((dayObj) => {
      const value = Object.values(dayObj)[0];
      return value !== undefined && value[0] !== 'Aucune disponibilité';
    });
    if (!profile) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Please update the profile',
        data: [],
      };
    }
    return availability;
  }

  //find student level lessons
  async findStudentNotLinkedLessons(student_id: number): Promise<any> {
    const profile = await this.UserProfileRepository.createQueryBuilder(
      'user_profile',
    )
      .leftJoin('user_profile.user', 'user')
      .leftJoin('user.role_id', 'role_id')
      .select(['user_profile.my_needs AS my_needs'])
      .where('user_profile.user_id = :student_id', {
        student_id,
      })
      .getRawOne();
    return profile;
  }
  //find tutor levels
  async extractNonEmptyLevels(
    level: any,
    nonEmptyLevels: string[],
    currentLevel = '',
  ): Promise<any> {
    if (Array.isArray(level) && level.length > 0) {
      const subLevelName = currentLevel.split('.').pop();
      nonEmptyLevels.push(subLevelName);
    } else if (typeof level === 'object' && level !== null) {
      Object.entries(level).forEach(([subLevel, subLevelValue]) => {
        const nextLevel = currentLevel
          ? `${currentLevel}.${subLevel}`
          : subLevel;
        this.extractNonEmptyLevels(subLevelValue, nonEmptyLevels, nextLevel);
      });
    }
  }

  //find same school levels
  async calculateSameLevelLessonScore(
    tutorLevels: any,
    student_level: string,
  ): Promise<any> {
    let total_score = 0;
    const tutor_school_levels: string[] = [];
    await this.extractNonEmptyLevels(tutorLevels, tutor_school_levels);

    const matchingLevels = tutor_school_levels.filter((tutorLevel) =>
      tutorLevel.includes(student_level),
    );
    total_score += matchingLevels.length > 0 ? 100 : 0;
    return total_score;
  }

  //find tutor's all level lessons
  async extractSubjects(level: any, subjects: number[]): Promise<any> {
    if (Array.isArray(level)) {
      subjects.push(...level);
    } else if (typeof level === 'object' && level !== null) {
      Object.values(level).forEach((subLevel) => {
        this.extractSubjects(subLevel, subjects);
      });
    }
  }

  //calculate level lesson score
  async calculateLevelLessonsTotal(
    matchingSubjectsPercentage: number,
  ): Promise<any> {
    let total_score = 0;
    if (matchingSubjectsPercentage > 66) {
      return (total_score += 80);
    } else if (matchingSubjectsPercentage > 33) {
      return (total_score += 60);
    } else {
      return total_score;
    }
  }

  //find same level lessons
  async calculateSameSubjectsScore(
    tutorLevels: number[],
    student_level_lessons: number[],
  ): Promise<any> {
    let total_score = 0;
    const tutorSubjects: number[] = [];
    await this.extractSubjects(tutorLevels, tutorSubjects);

    const studentSet = new Set(student_level_lessons);
    const matchingSubjects = tutorSubjects.filter((lesson) =>
      studentSet.has(lesson),
    );

    const matchingSubjectsPercentage = Math.round(
      (100 * matchingSubjects.length) / tutorSubjects.length,
    );

    const same_lesson_score = await this.calculateLevelLessonsTotal(
      matchingSubjectsPercentage,
    );

    total_score += same_lesson_score;
    return total_score;
  }

  //convert schedule time to hours
  async convertTimeToHours(time): Promise<any> {
    const [hoursStart, minutesEnd] = time.split(':');
    const hours = parseInt(hoursStart, 10);
    const minutes = parseInt(minutesEnd, 10);
    const totalHours = hours + minutes / 60;
    return totalHours;
  }

  //find same schedule and score
  async calculateSameScheduleScore(
    tutor_schedule: any,
    student_schedule: any,
  ): Promise<any> {
    let total_score = 0;
    const matchingSchedule = [];
    await Promise.all(
      tutor_schedule.map(async (tutorSchedule) => {
        const tutorDay = Object.keys(tutorSchedule)[0];
        const tutorTime =
          tutorSchedule[tutorDay as keyof typeof tutorSchedule][0];
        const [tutorStartTime, tutorEndTime] = tutorTime.split(' to ');
        const start_time = await this.convertTimeToHours(tutorStartTime);
        const end_time = await this.convertTimeToHours(tutorEndTime);

        // Find the corresponding entry in student_schedule for the same day
        const matchingStudentSchedule = student_schedule.find(
          (studentSchedule: {}) => {
            const studentDay = Object.keys(studentSchedule)[0];
            return studentDay === tutorDay;
          },
        );

        if (matchingStudentSchedule) {
          const studentTime = matchingStudentSchedule[tutorDay];
          const [studentStartTime, studentEndTime] =
            studentTime[0].split(' to ');
          const studentStart_time = await this.convertTimeToHours(
            studentStartTime,
          );
          const studentEnd_time = await this.convertTimeToHours(studentEndTime);

          if (start_time <= studentStart_time && end_time >= studentEnd_time) {
            matchingSchedule.push(tutorSchedule);
          }
        }
      }),
    );

    total_score = matchingSchedule.length > 0 ? 60 : 0;
    return total_score;
  }

  //find total duration using start time and end time
  async calculateTotalHours(timeRange): Promise<any> {
    const [start, end] = timeRange.split(' to ');
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    const totalStartHours = startHour + startMinute / 60;
    const totalEndHours = endHour + endMinute / 60;

    const hours = totalEndHours - totalStartHours;
    return hours;
  }

  //find same length of lessons
  async calculateSameDurationScore(
    tutor_schedule: any,
    student_schedule: any,
  ): Promise<any> {
    let total_score = 0;
    const tutorHours = await tutor_schedule.reduce(
      async (accPromise, dayObj) => {
        const acc = await accPromise;
        const day = Object.keys(dayObj)[0];
        const time = dayObj[day as keyof typeof dayObj][0];
        const hours = await this.calculateTotalHours(time);
        acc[day] = hours;
        return acc;
      },
      Promise.resolve({}),
    );

    const studentHours = await student_schedule.reduce(
      async (accPromise: any, dayObj: Object) => {
        const acc = await accPromise;
        const day = Object.keys(dayObj)[0];
        const time = dayObj[day as keyof typeof dayObj][0];
        const hours = await this.calculateTotalHours(time);
        acc[day] = hours;
        return acc;
      },
      Promise.resolve({}),
    );

    const matchingHours = {};
    for (const day in tutorHours) {
      if (tutorHours.hasOwnProperty(day) && studentHours.hasOwnProperty(day)) {
        const tutorHour = tutorHours[day];
        const studentHour = studentHours[day];

        if (tutorHour === studentHour) {
          matchingHours[day] = tutorHour;
        }
      }
    }
    total_score = Object.keys(matchingHours).length ? 60 : 0;
    return total_score;
  }

  //calculate frequency score
  async calculateSameFrequencyScore(
    tutor_schedule: any,
    student_schedule: any,
  ): Promise<number> {
    let total_score = 0;
    const studentDays = student_schedule.map(
      (dayObj: {}) => Object.keys(dayObj)[0],
    );
    const tutorDays = tutor_schedule.map(
      (dayObj: {}) => Object.keys(dayObj)[0],
    );
    const frequency =
      studentDays.length === tutorDays.length &&
      studentDays.every((day: any) => tutorDays.includes(day));

    if (frequency === true) {
      total_score += 40;
    }
    return total_score;
  }

  //calculate difficulties score
  async calculateDifficultiesTotal(
    difficultiesPercentage: number,
  ): Promise<any> {
    let total_score = 0;
    if (difficultiesPercentage === 100) {
      return (total_score += 90);
    } else if (difficultiesPercentage > 50) {
      return (total_score += 70);
    } else if (difficultiesPercentage > 33) {
      return (total_score += 50);
    } else {
      return total_score;
    }
  }

  //find same difficulties and score
  async calculateSameDifficultiesScore(
    tutor_difficulties: any,
    student_difficulties: any,
  ): Promise<any> {
    let total_score = 0;
    const studentDifficultiesArray = Object.keys(student_difficulties);
    const tutorDifficultiesArray = Object.keys(tutor_difficulties);

    const matchingDifficulties = studentDifficultiesArray.filter(
      (difficulty) =>
        tutorDifficultiesArray.includes(difficulty) &&
        Number(student_difficulties[difficulty]) === 1 &&
        Number(tutor_difficulties[difficulty]) === 1,
    );
    const difficultiesPercentage = Math.round(
      (100 * matchingDifficulties.length) / tutorDifficultiesArray.length,
    );
    const difficulties_score = await this.calculateDifficultiesTotal(
      difficultiesPercentage,
    );
    total_score += difficulties_score;
    return { total_score, matchingDifficulties };
  }

  //find same interests and score
  async calculateSameInterestScore(
    tutor_interests: any,
    student_interests: any,
  ): Promise<any> {
    let total_score = 0;
    const matchingInterests = Object.keys(student_interests || {}).filter(
      (interest) => {
        return (
          student_interests[interest] === 1 && tutor_interests[interest] === 1
        );
      },
    );
    total_score += 5 * matchingInterests.length;
    return total_score;
  }

  //calculate tutor activation bonus
  async findTutorActivationBonus(tutor_id: number): Promise<number> {
    const tutor = await this.userService.findUserByIdWithRole(tutor_id);

    const tutorCreatedAt = new Date(tutor.created_at);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - tutorCreatedAt.getTime();

    const differenceInDays = timeDifference / (1000 * 60 * 60 * 24);
    const tutor_student =
      (await this.tutorStudentService.findTutorStudentIds(tutor_id)) || 0;

    let total_score = 0;
    if (differenceInDays <= 14 && tutor_student.length <= 3) {
      total_score += 200;
    } else {
      total_score;
    }
    return total_score;
  }

  //calculate workload variance
  async findWorkloadVariance(tutor_id: number): Promise<number> {
    const tutorProfile = await this.findByUserId(tutor_id);
    const tutor_active_student =
      (await this.tutorStudentService.findTutorStudentIds(tutor_id)) || 0;

    const workload_variance =
      (tutor_active_student.length / tutorProfile?.no_of_students) * 100;

    let total_score = 0;
    if (workload_variance >= 85 && workload_variance <= 99.99) {
      total_score;
    } else if (workload_variance >= 70 && workload_variance <= 84.99) {
      total_score += 5;
    } else if (workload_variance >= 55 && workload_variance <= 69.99) {
      total_score += 10;
    } else if (workload_variance >= 40 && workload_variance <= 54.99) {
      total_score += 15;
    } else if (workload_variance >= 25 && workload_variance <= 39.99) {
      total_score += 20;
    } else if (workload_variance >= 5 && workload_variance <= 24.99) {
      total_score += 30;
    } else if (workload_variance >= 0 && workload_variance <= 4.99) {
      total_score += 100;
    }
    return total_score;
  }
}

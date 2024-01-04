import * as bcrypt from 'bcryptjs';

import {
  Inject,
  Injectable,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';

import {
  UserEntity as User,
  UserEntity,
  StudentSubjectEntity,
  TutorStudentEntity as TutorStudent,
  RoleEntity as Role,
  UserProfileEntity as UserProfile,
} from '../entities';
import { RoleModel, UserModel, UserUpdateModel } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { TutorStudentService } from '../tutor-student/tutor-student.service';
import { UserProfileService } from '../user_profile/user_profile.service';
import { TutorSessionService } from '../tutor-session/tutor-session.service';
import { TutorFollowUpService } from '../tutor-followup/tutor-followup.service';

@Injectable()
export class UserService {
  private saltRounds: number;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => TutorStudentService))
    private readonly tutorStudentService: TutorStudentService,
    @InjectRepository(UserProfile)
    private readonly UserProfileRepository: Repository<UserProfile>,
    private readonly userProfileService: UserProfileService,
    private readonly tutorSessionService: TutorSessionService,
    @Inject(forwardRef(() => TutorFollowUpService))
    private readonly tutorFollowUpService: TutorFollowUpService,
  ) {
    this.saltRounds = this.config.get('app.salt_rounds', 10);
  }

  async create(user: UserModel): Promise<User> {
    const userToCreate = {
      ...user,
      password: await this.getHash(user.password),
    };
    const result = await this.userRepository.save(
      this.userRepository.create(userToCreate),
    );
    await this.UserProfileRepository.save({ user: result?.['id'] });
    return result;
  }

  async update(
    userEntity: UserEntity,
    user: UserUpdateModel,
  ): Promise<UserEntity> {
    // if (user.password !== undefined) {
    //   user.password = await this.getHash(user.password);
    // }
    return await this.userRepository.save({
      ...userEntity,
      ...user,
    });
  }

  async forgotPassword(user: UserModel, pass: string): Promise<any> {
    const password = await this.getHash(pass);
    return await this.userRepository.save({
      ...user,
      password,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id: id }); //parseInt(id['id'])
  }

  async updateUserToken(user): Promise<any> {
    const token = await this.jwtService.sign({ id: user.id });
    return await this.userRepository.save({
      ...user,
      token,
    });
  }

  async getUsers(): Promise<any> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role_id', 'role_id')
      .select([
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'role_id',
        'user.profile_image',
        'user.isActive',
        'user.parent_id',
      ]);
  }

  async getUserParentIds(student_ids: number[]): Promise<number[]> {
    if (!student_ids || student_ids.length === 0) {
      return [];
    } else {
      const results = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.parent_id'])
        .where('user.id IN (:...student_ids)', { student_ids })
        .getMany();
      const parentIdsSet = new Set<number>(
        results.map((user) => user.parent_id).filter(Boolean),
      );
      const parentIds = Array.from(parentIdsSet);
      return parentIds;
    }
  }

  async searchUser(
    name: string,
    user: any,
    id: number,
  ): Promise<UserEntity | any> {
    const users = await this.getUsers();

    const fullNameQuery =
      "CONCAT(user.first_name, ' ', user.last_name) ILIKE :full_name";
    if (user.role_id.id === 2) {
      // find tutor students ids
      const F_studentIds = await this.tutorStudentService.findTutorStudentIds(
        user.id,
      );

      // find students parents
      const F_parentIds = await this.getUserParentIds(F_studentIds);

      const results = [...F_studentIds, ...F_parentIds].filter((element) => {
        return element !== null;
      });

      if (Number(id) === 4 && F_studentIds.length > 0) {
        await users.where('user.id IN (:...ids) AND ' + fullNameQuery, {
          ids: F_studentIds,
          full_name: `%${name}%`,
        });
      } else if (Number(id) === 3 && F_parentIds.length > 0) {
        await users.where('user.id IN (:...ids) AND ' + fullNameQuery, {
          ids: F_parentIds,
          full_name: `%${name}%`,
        });
      } else {
        if (results.length > 0) {
          await users.where('user.id IN (:...ids) AND  ' + fullNameQuery, {
            ids: results,
            full_name: `%${name}%`,
          });
        } else {
          return [];
        }
      }
    } else if (user.role_id.id === 3) {
      // find parent students
      const ParentStudent = await this.getParentStudent(user?.id);
      const F_students = ParentStudent.map((student) => student.id);

      // find students tutor
      const parentStudentTutor =
        await this.tutorStudentService.parentStudentTutorIds(F_students);
      const F_tutors = parentStudentTutor.map((tutor) => tutor.id);

      const results = [...F_students, ...F_tutors].filter((element) => {
        return element !== null;
      });
      if (results.length > 0) {
        await users.where('user.id IN (:...results) AND  ' + fullNameQuery, {
          results,
          full_name: `%${name}%`,
        });
      } else {
        return [];
      }
    } else if (user.role_id.id === 4) {
      // find students tutor
      const parentStudentTutor =
        await this.tutorStudentService.parentStudentTutorIds([user.id]);
      const F_tutors = parentStudentTutor.map((tutor) => tutor.id);

      const results = [...F_tutors, user.parent_id].filter((element) => {
        return element !== null;
      });
      if (results.length > 0) {
        await users.where('user.id IN (:...id) AND ' + fullNameQuery, {
          id: results,
          full_name: `%${name}%`,
        });
      } else {
        return [];
      }
    }
    return users.getMany();
  }

  async getProfile(id): Promise<any | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return join(
      __dirname,
      '../../uploads/profile_images/' + user.profile_image,
    );
  }

  async getProfileImage(
    image: string,
    folder_name: string,
  ): Promise<string | null> {
    const imagePath = join(__dirname, `../../uploads/${folder_name}`, image);

    try {
      const stats = await fs.stat(imagePath);
      if (stats.isFile()) {
        return imagePath;
      }
    } catch (error) {
      throw new BadRequestException('Profile image not found');
    }

    return null;
  }

  async deleteProfileImage(userId: number): Promise<any> {
    const user = await this.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    user.profile_image = null;

    await this.userRepository.save(user);
  }

  async findUserByIdWithRole(id): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role_id'],
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['role_id'] });
  }

  async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async destroy(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['role_id'],
      select: ['id', 'email', 'password', 'role_id', 'first_name', 'last_name'],
    });
  }

  async findUserByRoleId(id: number, user: any): Promise<UserEntity | any> {
    const users = await this.getUsers();
    if (user.role_id.id === 2) {
      // find tutor students ids
      const F_studentIds = await this.tutorStudentService.findTutorStudentIds(
        user.id,
      );

      const F_parentIds = await this.getUserParentIds(F_studentIds);

      const results = [...F_studentIds, ...F_parentIds].filter((element) => {
        return element !== null;
      });

      if (Number(id) === 4 && F_studentIds.length > 0) {
        await users.where('user.id IN (:...id)', {
          id: F_studentIds,
        });
      } else if (Number(id) === 3 && F_parentIds.length > 0) {
        await users.where('user.id IN (:...id)', {
          id: F_parentIds,
        });
      } else {
        if (results.length > 0) {
          await users.where('user.id IN (:...ids)', { ids: results });
        } else {
          return [];
        }
      }
    } else if (user.role_id.id === 3) {
      // find parent students
      const ParentStudent = await this.getParentStudent(user?.id);
      const F_students = ParentStudent.map((student) => student.id);

      // find students tutor
      const parentStudentTutor =
        await this.tutorStudentService.parentStudentTutorIds(F_students);
      const F_tutors = parentStudentTutor.map((tutor) => tutor.id);

      const results = [...F_students, ...F_tutors].filter((element) => {
        return element !== null;
      });
      if (results.length > 0) {
        await users.where('user.id IN (:...id)', {
          id: results,
        });
      } else {
        return [];
      }
    } else if (user.role_id.id === 4) {
      // find students tutor
      const parentStudentTutor =
        await this.tutorStudentService.parentStudentTutorIds([user.id]);
      const F_tutors = parentStudentTutor.map((tutor) => tutor.id);
      const results = [...F_tutors, user.parent_id].filter((element) => {
        return element !== null;
      });
      if (results.length > 0) {
        await users.where('user.id IN (:...id)', {
          id: results,
        });
      } else {
        return [];
      }
    }
    return users.getMany();
  }

  async updateOnlineStatus(id: number, isActive: number): Promise<any> {
    return await this.userRepository.update(
      { id: id },
      {
        isActive: isActive,
        updated_at: new Date(),
      },
    );
  }

  async getParentStudent(id: number): Promise<UserEntity[]> {
    if (id == null) {
      return [];
    } else {
      return await this.userRepository
        .createQueryBuilder('user')
        .leftJoin('user.role_id', 'role_id')
        .leftJoinAndMapMany(
          'user.subjects',
          StudentSubjectEntity,
          'ss', //student_subject = ss
          'ss.student_id = user.id',
        )
        .leftJoin('ss.subject', 'subject')
        .select([
          'user.id',
          'user.first_name',
          'user.last_name',
          'user.email',
          'user.profile_image',
          'user.gender',
          'role_id.id',
          'role_id.name',
          'ss',
          'subject',
        ])
        .where('user.parent_id = :id', { id })
        .getMany();
    }
  }

  async getStudentParent(id: number): Promise<UserEntity[]> {
    if (id == null) {
      return [];
    } else {
      return await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.first_name',
          'user.last_name',
          'user.email',
          'role_id',
          'user.profile_image',
          'user.parent_id',
        ])
        .where('user.id = :id', { id })
        .getMany();
    }
  }

  async updateParentStudent(studentDetails: any[]): Promise<any> {
    const updatedStudents = await Promise.all(
      studentDetails.map(async (user) => {
        const updatedUser = await this.userRepository.save({
          ...user,
          first_name: user['first_name'],
          last_name: user['last_name'],
        });
        return Object.fromEntries(
          Object.entries(updatedUser).filter(([key, value]) => value !== null),
        );
      }),
    );
    return updatedStudents;
  }

  //find admin linked all users using role_id
  //role_id = 2 => All tutors || role_id = 3 => All parents || role_id = 4 => All students
  async getAdminLinkedUsersWithSearch(role_id: number, search: string) {
    const query = await this.getUsers();
    return await query
      .where(
        "(user.role_id = :role_id) AND (CONCAT(user.first_name, ' ', user.last_name) LIKE :search)",
        {
          role_id,
          search: `%${search}%`,
        },
      )
      .orderBy('user.id', 'ASC')
      .getMany();
  }

  //find admin's all tutor details
  async getAllAdminTutors(
    role_id: number,
    page: number,
    limit: number,
    searchQuery: string,
  ): Promise<any> {
    const tutors = await this.getAdminLinkedUsersWithSearch(
      role_id,
      searchQuery,
    );

    const tutorPromises = tutors.map(async (tutor) => {
      const [
        tutor_all_students,
        tutor_active_students,
        tutor_general_evaluation,
      ] = await Promise.all([
        this.userProfileService.getTutorTotalStudents(tutor?.id),
        this.tutorSessionService.getSessionsMonthWise(tutor?.id),
        this.tutorFollowUpService.findtutorEvalutionGeneral(tutor?.id),
      ]);

      return {
        id: tutor?.id,
        first_name: tutor?.first_name,
        last_name: tutor?.last_name,
        profile_image: tutor?.profile_image,
        tutor_last_active_students:
          tutor_active_students?.tutor_last_active_students.length,
        tutor_current_active_students:
          tutor_active_students?.tutor_current_active_students.length,
        tutor_all_students: tutor_all_students?.no_of_students,
        tutor_general_evaluation: Number(tutor_general_evaluation.toFixed(2)),
      };
    });

    const tutor_details = await Promise.all(tutorPromises);
    const totalTutorData = tutor_details.length;
    const totalPages = Math.ceil(totalTutorData / limit);
    const startIndex = (page - 1) * limit;

    const paginatedTutorData = tutor_details.splice(startIndex, limit);

    return {
      tutors: paginatedTutorData,
      totalTutorData,
      totalPages,
      currentPage: page,
    };
  }

  //find admin's all parent details
  async getAllAdminParents(
    admin_id: number,
    role_id: number,
    page: number,
    limit: number,
    searchQuery: string,
  ) {
    const associated_admin = await this.findUserByIdWithRole(admin_id);
    const parents = await this.getAdminLinkedUsersWithSearch(
      role_id,
      searchQuery,
    );

    const parentPromises = parents.map(async (parent) => {
      const ParentStudent = await this.getParentStudent(parent?.id);
      return {
        parent_id: parent?.id,
        parent_first_name: parent?.first_name,
        parent_last_name: parent?.last_name,
        parent_profile_image: parent?.profile_image,
        parent_students: ParentStudent.map((student) => ({
          id: student.id,
          first_name: student.first_name,
          last_name: student.last_name,
          profile_image: student.profile_image,
        })),
        admin_first_name: associated_admin?.first_name,
        admin_last_name: associated_admin?.last_name,
        admin_profile_image: associated_admin?.profile_image,
      };
    });
    const parent_details = await Promise.all(parentPromises);
    const totalParentData = parent_details.length;
    const totalPages = Math.ceil(totalParentData / limit);
    const startIndex = (page - 1) * limit;

    const paginatedTutorData = parent_details.splice(startIndex, limit);

    return {
      tutors: paginatedTutorData,
      totalParentData,
      totalPages,
      currentPage: page,
    };
  }

  //find parent's students with search filter
  async getParentStudentsWithSearch(
    id: number,
    search: string,
  ): Promise<UserEntity[]> {
    if (id == null) {
      return [];
    } else {
      return await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.first_name',
          'user.last_name',
          'user.email',
          'user.profile_image',
          'user.phone_no',
        ])
        // .where('user.parent_id = :id', { id })
        .where(
          "(user.parent_id = :id) AND (CONCAT(user.first_name, ' ', user.last_name) LIKE :search)",
          {
            id,
            search: `%${search}%`,
          },
        )
        .getMany();
    }
  }

  //find student's parent
  async findStudentsParentDetails(student_id: number) {
    const student_parent = await this.getStudentParent(student_id);
    const parent = await this.findUserByIdWithRole(
      student_parent[0]?.parent_id,
    );
    const parent_details = {
      first_name: parent?.['first_name'],
      last_name: parent?.['last_name'],
      profile_image: parent?.['profile_image'],
      role: parent?.['role_id']?.['name'],
    };
    return parent_details;
  }

  //create user roles
  async createUserRole(roleModel: RoleModel): Promise<Role> {
    return await this.roleRepository.save(roleModel);
  }

  //get all students having given level
  async getAllStudents(level: number, student_ids: number[]): Promise<any> {
    const queryBuilder = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role_id', 'role_id')
      .leftJoinAndMapOne(
        'user.profile',
        UserProfile,
        'profile',
        'user.id = profile.user_id',
      )
      .select([
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'role_id',
        'user.profile_image',
        'user.isActive',
        'user.parent_id',
        'user.language',
        'user.school_level',
        'profile.my_needs',
      ])
      .where('user.role_id = :role_id', { role_id: 4 });

    if (student_ids.length > 0) {
      queryBuilder.andWhere('user.id NOT IN (:...student_ids)', {
        student_ids,
      });
    }
    const students = await queryBuilder.getMany();

    return students.filter((student) =>
      student?.['profile']?.my_needs?.matter?.includes(level),
    );
  }

  //get all tutors having given subjects
  async getAllTutors(subjects: number[]): Promise<any> {
    const queryBuilder = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role_id', 'role_id')
      .leftJoinAndMapOne(
        'user.profile',
        UserProfile,
        'profile',
        'user.id = profile.user_id',
      )
      .select(['user.id', 'profile.levels_and_subjects'])
      .where('user.role_id = :role_id', { role_id: 2 })
      .getMany();
    return queryBuilder
      .filter(async (tutor) => {
        const tutorLevels = tutor?.['profile']?.levels_and_subjects;
        const tutorSubjects: number[] = [];
        await this.userProfileService.extractSubjects(
          tutorLevels,
          tutorSubjects,
        );
        tutorSubjects.sort((a, b) => a - b);
        return tutorSubjects.some((subject) => subjects.includes(subject));
      })
      .map((matchingTutor) => matchingTutor.id);
  }
}

import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MySchoolLevelsEntity as MySchoolLevels,
  MySchoolLevelSubjectsEntity as MySchoolLevelSubjects,
} from '../entities/index';
import { Repository } from 'typeorm';
import { MySchoolLevelSubjectsModel, MySchoolLevelsModel } from '../dto/index';
import { UserService } from '../user';

@Injectable()
export class MySchoolLevelsService {
  constructor(
    @InjectRepository(MySchoolLevels)
    private readonly mySchoolLevelsRepository: Repository<MySchoolLevels>,
    @InjectRepository(MySchoolLevelSubjects)
    private readonly MySchoolLevelSubjectsRepository: Repository<MySchoolLevelSubjects>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  //create school levels
  async createSchoolLevels(
    mySchoolLevelsModel: MySchoolLevelsModel,
  ): Promise<any> {
    return await this.mySchoolLevelsRepository.save(mySchoolLevelsModel);
  }

  //find all school levels
  async findMySchoolLevels() {
    return await this.mySchoolLevelsRepository.find();
  }

  //find particular school level
  async findById(id: number): Promise<any> {
    return await this.mySchoolLevelsRepository.findOneBy({ id: id });
  }

  //create school level subjects
  async createSchoolLevelSubjects(
    mySchoolLevelSubjectsModel: MySchoolLevelSubjectsModel,
  ): Promise<any> {
    return await this.MySchoolLevelSubjectsRepository.save(
      mySchoolLevelSubjectsModel,
    );
  }

  async findLevelWiseSubject(school_level_id: number): Promise<any> {
    return await this.MySchoolLevelSubjectsRepository.createQueryBuilder(
      'school_level_subject',
    )
      .leftJoin('school_level_subject.setting_no', 'my_school_level')
      .select(['school_level_subject', 'my_school_level'])
      .where('my_school_level.id = :id', { id: school_level_id })
      .orderBy('school_level_subject.order_no', 'ASC')
      .getMany();
  }

  //find my school level subjects
  async findMySchoolLevelSubjects(id: number): Promise<any> {
    const user = await this.userService.findUserByIdWithRole(id);
    const school_level = Number(user?.school_level);
    return await this.findLevelWiseSubject(school_level);
  }

  //find school level wise all subjects
  async findAllSchoolLevelSubjects() {
    const my_school_levels = await this.findMySchoolLevels();
    const schoolLeveldata = my_school_levels.map(async (level) => {
      const level_wise_subjects = await this.findLevelWiseSubject(level?.id);
      return {
        [level?.name_en]: level_wise_subjects,
      };
    });

    const resultArray = await Promise.all(schoolLeveldata);
    const result = Object.assign({}, ...resultArray);
    return result;
  }
}

import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { TutorStudentService } from '../tutor-student/tutor-student.service';

@Processor('tutorStudentMatch')
export class TutorStudentProcessor {
  constructor(private tutorStudentService: TutorStudentService) {}

  @Process('findMatchingStudents')
  async findMatchingStudents(job: Job) {
    try {
      await this.tutorStudentService.findMatchingStudents(
        job.data.id || job.data.tutor,
      );
    } catch (error) {
      console.error(`Error processing job ${job.id}: ${error.message}`);
    }
  }
}

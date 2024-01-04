import { Module } from '@nestjs/common';
import { TutorDocumentService } from './tutor-document.service';
import { TutorDocumentController } from './tutor-document.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorDocumentEntity } from 'src/entities';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './uploads/tutor_documents',
          filename: (req, file, callback) => {
            const fileExtName = extname(file.originalname);
            callback(null, `${uuidv4()}${fileExtName}`);
          },
        }),
      }),
    }),
    TypeOrmModule.forFeature([TutorDocumentEntity]),
  ],
  controllers: [TutorDocumentController],
  providers: [TutorDocumentService],
})
export class TutorDocumentModule {}

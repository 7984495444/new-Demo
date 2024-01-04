import { Module } from '@nestjs/common';
import { ChatMessageController } from './chat.controller';
import { ChatMessageService } from './chat.service';
import { UserModule } from '../user';
import { ChatEntity, ChatMessageEntity } from '../entities/index';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessageEntity, ChatEntity]),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: (req, file, callback) => {
            let destinationPath = './uploads/chat/images';
            if (file.mimetype.startsWith('video')) {
              destinationPath = './uploads/chat/videos';
            }
            callback(null, destinationPath);
          },
          filename: (req, file, callback) => {
            const fileExtName = extname(file.originalname);
            callback(null, `${uuidv4()}${fileExtName}`);
          },
        }),
        limits: { files: 5 },
      }),
    }),
    UserModule,
  ],
  controllers: [ChatMessageController],
  providers: [ChatMessageService, ChatGateway],
  exports: [ChatMessageService, ChatGateway],
})
export class ChatMessageModule {}

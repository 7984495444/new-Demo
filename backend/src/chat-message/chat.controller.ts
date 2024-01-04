import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { ChatGateway } from './chat.gateway';
import { ChatMessageService } from './chat.service';

@Controller('/chat-message')
export class ChatMessageController {
  public constructor(
    private readonly chatMessageService: ChatMessageService,
    private readonly sockets: ChatGateway,
  ) {}

  @Post('file')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  @UseInterceptors(FilesInterceptor('chat_video', 5))
  async uploadFile(@UploadedFiles() chat_video: Array<Express.Multer.File>) {
    const chat_videos_files = [];
    for (let index = 0; index < chat_video.length; index++) {
      const element = chat_video[index];
      chat_videos_files.push({ video_thumb: element.filename });
    }
    return chat_videos_files;
  }

  @Post('image')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  @UseInterceptors(FilesInterceptor('chat_image', 5))
  async uploadImage(@UploadedFiles() chat_image: Array<Express.Multer.File>) {
    const chat_images_files = [];
    for (let index = 0; index < chat_image.length; index++) {
      const element = chat_image[index];
      chat_images_files.push({ attachment: element.filename });
    }
    return chat_images_files;
  }

  @Get('image/:image')
  @Roles('admin', 'tutor', 'parent', 'student')
  getImageFile(@Req() req, @Res() res) {
    res.sendfile(
      join(__dirname, '../../uploads/chat/images/' + req.params.image),
    );
  }

  @Get('video/:video')
  @Roles('admin', 'tutor', 'parent', 'student')
  getVideoFile(@Req() req, @Res() res) {
    res.sendfile(
      join(__dirname, '../../uploads/chat/videos/' + req.params.video),
    );
  }
  @Get('video/thumb/:thumb')
  @Roles('admin', 'tutor', 'parent', 'student')
  getVideoFileThumb(@Req() req, @Res() res) {
    res.sendfile(
      join(__dirname, '../../uploads/chat/videos/thumb/' + req.params.thumb),
    );
  }
}

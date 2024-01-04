import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatMessageService } from './chat.service';
import { UserService } from '../user';
import { ChatMessageModel } from '../dto/index';
// import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import * as ffmpeg from 'fluent-ffmpeg';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() webSocketServer: Server;
  constructor(
    private userService: UserService,
    private chatMessageService: ChatMessageService,
  ) {}
  handleConnection(client: Socket): void {
    console.log(`connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    console.log(`disconnected: ${client.id}`);
    client.disconnect();
  }

  async generateThumbnail(video: string): Promise<string> {
    const thumbnailName = uuidv4();
    const videoPath = join(__dirname, '../../uploads/chat/videos/' + video);
    return new Promise<string>((resolve, reject) => {
      ffmpeg(videoPath)
        .screenshots({
          count: 1,
          folder: 'uploads/chat/videos/thumb',
          filename: thumbnailName + '.jpg',
        })
        .on('end', () => resolve(thumbnailName + '.jpg'))
        .on('error', (err) => reject(err));
    });
  }

  @SubscribeMessage('messageToUser')
  async handleMessage(
    socket: Socket,
    chatMessage: ChatMessageModel,
  ): Promise<any> {
    if (chatMessage.message_type === 'video') {
      const videoThumbs = [];
      for (let index = 0; index < chatMessage?.video_thumb.length; index++) {
        const element: any = chatMessage?.video_thumb[index];
        const thumb = await this.generateThumbnail(element.video_thumb);
        element.thumb = thumb;
        videoThumbs.push(element);
      }
      chatMessage.video_thumb = videoThumbs;
    }

    // if (chatMessage.message_type === 'image') {
    //   chatMessage?.attachment?.forEach((element) => {
    //     // create file name
    //     const fileName = uuidv4() + '.' + element['extention'];

    //     //upload file path
    //     const filePath = `./uploads/chat/images/${fileName}`;

    //     delete element['extention'];
    //     fs.writeFileSync(filePath, element['attachment']);
    //     element['attachment'] = fileName;
    //   });
    // }

    const chat = await this.chatMessageService.create(chatMessage);

    const findSingleChat = await this.chatMessageService.getSingleChat(
      chat['id'],
    );

    this.webSocketServer.emit('messageReceive', findSingleChat);
  }

  @SubscribeMessage('createToChat')
  async createChat(client: Socket, { user1_id, user2_id }) {
    const chat = await this.chatMessageService.createChat({
      user1_id,
      user2_id,
    });

    this.webSocketServer.emit('recCreateToChat', {
      id: client.id,
      client: chat,
    });
  }

  @SubscribeMessage('updateChatSeenStatus')
  async updateSeenStatus(client: Socket, chatUserId) {
    await this.chatMessageService.updateChtSeenUserId(
      {
        chat_id: chatUserId[0].id,
      },
      {
        user_id: chatUserId[1].user_id,
      },
    );
  }

  @SubscribeMessage('getChatData')
  async getChatData(client: Socket, chat_id) {
    const chat = await this.chatMessageService.getAllChats(chat_id);

    this.webSocketServer.emit('recGetChatData', chat, chat_id);
  }

  @SubscribeMessage('leaveToChat')
  async leaveChat(client: Socket) {
    client.disconnect(true);
  }

  @SubscribeMessage('setUserOnline')
  async setUserOnline(id, isActive) {
    await this.userService.updateOnlineStatus(id, isActive);
  }

  @SubscribeMessage('setUserOffline')
  async setUserOffline(id, isActive) {
    await this.userService.updateOnlineStatus(id, isActive);
  }
}

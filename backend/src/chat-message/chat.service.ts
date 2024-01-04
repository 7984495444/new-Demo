import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessageEntity, ChatEntity as Chat } from '../entities';
import { ChatMessageModel, ChatModel } from '../dto';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(ChatMessageEntity)
    private readonly chatMessageRepository: Repository<ChatMessageEntity>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  // create chat
  async createChat(chatModel: ChatModel): Promise<Chat> {
    // find already exist or not
    const chatUserExiest = await this.findOneByUserChat(
      chatModel.user1_id,
      chatModel.user2_id,
    );

    // send created chat id
    if (chatUserExiest) {
      return chatUserExiest;
    } else {
      return await this.chatRepository.save(chatModel);
    }
  }

  //update chat seen user
  async updateChtSeenUserId(chat_id, user_id): Promise<any> {
    if (chat_id) {
      return await this.chatMessageRepository
        .createQueryBuilder()
        .update('chat_message')
        .set({
          isSeen: 1,
        })
        .where('chat_message.chat_id = :id AND chat_message.user_id != :id1', {
          id: chat_id.chat_id,
          id1: user_id.user_id,
        })
        .execute();
    }
  }

  async findOneChat(Query): Promise<any> {
    const { user1_id, user2_id } = Query;
    const chatData = await this.chatRepository.find({
      where: [
        { user1_id, user2_id },
        { user1_id: user2_id, user2_id: user1_id },
      ],
    });
    // const chatIds = [];
    // chatData.map((item) => {
    //   chatIds.push({ id: item.id });
    // });

    return chatData[0]?.id;
  }

  async findOneByUserChat(user1_id: number, user2_id: number): Promise<Chat> {
    return await this.chatRepository.findOne({
      where: [
        { user1_id, user2_id },
        { user1_id: user2_id, user2_id: user1_id },
      ],
    });
  }

  // create chat message
  async create(chatMessageModel: ChatMessageModel): Promise<ChatMessageModel> {
    return this.chatMessageRepository.save(chatMessageModel);
  }

  async getAllChats(id: number): Promise<ChatMessageModel[]> {
    const chat_id = await this.findOneChat(id);
    return await this.chatMessageRepository
      .createQueryBuilder('chat_message')
      .leftJoinAndSelect('chat_message.chat_id', 'chat_id')
      .leftJoinAndSelect('chat_message.user_id', 'user_id')
      .where({ chat_id: chat_id })
      // .orWhere({ chat_id: ids[1] })
      .orderBy('chat_message.created_at')
      .getMany();
  }

  async getUserLastMessage(id: object): Promise<ChatMessageModel[]> {
    const chat_id = await this.findOneChat(id);
    const chat = await this.chatMessageRepository
      .createQueryBuilder('chat_message')
      .leftJoinAndSelect('chat_message.chat_id', 'chat_id')
      .leftJoinAndSelect('chat_message.user_id', 'user_id')
      .where({ chat_id: chat_id })
      // .orWhere({ chat_id: ids[1] })
      .orderBy('chat_message.created_at', 'ASC')
      .getMany();
    return chat.slice(-1);
  }

  async getSingleChat(id: number): Promise<ChatMessageModel> {
    return await this.chatMessageRepository
      .createQueryBuilder('chat_message')
      .leftJoinAndSelect('chat_message.chat_id', 'chat_id')
      .leftJoinAndSelect('chat_message.user_id', 'user_id')
      .where({ id: id })
      .getOne();
  }
}

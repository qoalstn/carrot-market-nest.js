import { Injectable } from '@nestjs/common';
import { ChatRepository, ChatRoomRepository } from './chat.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepo: ChatRepository,
    private readonly chatRoomRepo: ChatRoomRepository,
  ) {}

  async getChatById(chat_id) {
    const data = await this.chatRepo.findOne(chat_id);
    return data;
  }

  async getChatRoomById(room_id) {
    const data = await this.chatRoomRepo.findOne(room_id);
    return data;
  }

  async createRoom() {}

  async saveChat() {}
}

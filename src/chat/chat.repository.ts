import { EntityRepository, Repository } from 'typeorm';
import { ChatEntity, ChatRoomEntity } from './entities/chat.entity';

@EntityRepository(ChatEntity)
export class ChatRepository extends Repository<ChatEntity> {}

@EntityRepository(ChatRoomEntity)
export class ChatRoomRepository extends Repository<ChatRoomEntity> {}

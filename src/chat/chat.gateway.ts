import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway(8080, { transports: ['websocket'] })
export class ChatGateway {
  constructor(private readonly userService: UserService) {}
  @WebSocketServer()
  socket: Server;

  handleConnection() {
    console.log('coneect..');
  }

  @SubscribeMessage('chat')
  async handleChat(@MessageBody() data: CreateChatDto) {
    // console.log(data);

    if (!data.user_id || !data.product_id) {
      return this.errorHandler(400, 'Bad Request');
    }
    const { user_id, product_id } = data;

    const existUser = await this.userService.findOneById(user_id);

    if (!existUser) {
      return this.errorHandler(409, 'NO EXIST USER');
    }

    // 신규 채팅 인입 시 채팅 요청 userId + Date으로 room 생성
    if (!data.room_id) data.room_id = user_id + product_id;

    //room 진입
    this.socket.socketsJoin(data.room_id);

    this.socket.to(data.room_id).emit('chat', 'return data');

    // this.socket.to(data.roomId).emit('notice', 'return data');

    // user 또는 sys가 message를 broadcast로 보낸다.
    // user type으로 my, you, sys를 구분하여 화면에 출력 될 수 있도록 한다.
    // return data;
  }

  handleDisconnect() {
    console.log('disconnect..');
  }

  errorHandler(status: number, message: string, room?: string) {
    if (room) {
      this.socket.to(room).emit('error', { status, message });
    } else {
      this.socket.emit('error', { status, message });
    }
  }
}

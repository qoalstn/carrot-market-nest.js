import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BadRequestException } from 'src/exceptions/http-exception.filter';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway(8080, { transports: ['websocket'] })
export class ChatGateway {
  @WebSocketServer()
  socket: Server;

  handleConnection() {
    console.log('coneect..');
  }

  @SubscribeMessage('chat')
  handleChat(@MessageBody() data: CreateChatDto) {
    // console.log(data);

    if (!data.user_id || !data.product_id) throw new BadRequestException();
    const { user_id, product_id } = data;

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
}

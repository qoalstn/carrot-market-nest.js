import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway(8080, { transports: ['websocket'] })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('coneect..');
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    console.log(data);

    return data;
  }

  handleDisconnect() {
    console.log('disconnect..');
  }
}

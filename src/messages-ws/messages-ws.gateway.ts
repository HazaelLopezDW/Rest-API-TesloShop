import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Get } from '@nestjs/common';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect{

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    console.log('Cliente Conectado:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente Desconectado:', client.id);
  }

  


 

}

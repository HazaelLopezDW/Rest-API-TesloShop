import { WebSocketGateway } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Get } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway {

  constructor(private readonly messagesWsService: MessagesWsService) {
      
  }
  
  @Get()
  getMethod() {
    return `Hola mundo`
  }

}

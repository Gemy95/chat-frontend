import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  // emit event
  joinRoom() {
    this.socket.emit('join', { roomId: 'CHAT_ROOM' });
  }
  // emit event
  sendMessage(message: string) {
    this.socket.emit('send-message', { message });
  }

  // listen event
  async onNewMessage() {
    return this.socket.fromEvent('new-message');
  }
  
  // listen event
  async onAvailableMessage() {
      return this.socket.fromEvent('available-messages')
  }
}

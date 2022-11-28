import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  // emit event
  joinRoom() {
    this.socket.emit('join', { roomId: 'REDIS_USERS_CHAT_ROOM' });
  }
  // emit event
  sendMessage(message: string) {
    this.socket.emit('send-message', { message });
  }

  // listen event
  async onNewMessage() {
    const data = await firstValueFrom(
      await this.socket.fromEvent('new-message')
    );
    return data;
  }
  
  // listen event
  async onAvailableMessage() {
    const data = await firstValueFrom(
      await this.socket.fromEvent('available-messages')
    );
    return data;
  }
}

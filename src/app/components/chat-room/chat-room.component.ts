import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { WebsocketService } from '../../services/websocket-service/websocket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent  implements OnInit {

	availableMessages:any=[];
  sendForm: FormGroup;

	constructor(
		private socket: WebsocketService,
    private toaster: ToasterService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
	) { 
    this.sendForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  get message() {
    return this.sendForm.get('message');
  }

  async onSubmit() {
    try {
      await this.socket.sendMessage(this.sendForm.value.message);
      this.toaster.showSuccess('Successfully', 'Send message');
      const user = await this.authService.decodeToken();
      if(this?.availableMessages?.length > 10) this.availableMessages.shift();
      this.availableMessages.push({message: this.sendForm.value.message, createdAt: new Date(), user});
      this.sendForm.reset();
    } catch (error) {
      console.log(error);
      this.toaster.showFaield('Failed to Send message , Please try again', 'Error');
    }
  }

  async ngOnInit() {

    await this.socket.joinRoom();
	  this.availableMessages = await this.socket.onAvailableMessage();

     (await this.socket.onNewMessage()).subscribe((newMessgage)=>{
      this.availableMessages.shift();
        this.availableMessages.push(newMessgage);
      });
	}
}
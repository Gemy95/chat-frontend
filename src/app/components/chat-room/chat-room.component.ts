import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      this.toaster.showSuccess('Successfully', 'Login');
    } catch (error) {
      console.log(error);
      this.toaster.showFaield('Failed to login , Please try again', 'Error');
    }
  }

  async ngOnInit() {

    await this.socket.joinRoom();
	  this.availableMessages = await this.socket.onAvailableMessage();

    await this.socket.onNewMessage().then((newMessgage)=>{
      console.log("newMessgage=",newMessgage)
      this.availableMessages.shift();
      this.availableMessages.push(newMessgage);
    });

	}
}
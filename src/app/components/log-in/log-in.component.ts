import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ChatService } from '../../services/chat-service/chat.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private toaster: ToasterService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    try {
      await firstValueFrom(
        await this.chatService.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
      );
      this.toaster.showSuccess('Successfully', 'Login');
    } catch (error) {
      console.log(error);
      this.toaster.showFaield('Failed to login , Please try again', 'Error');
    }
  }
  ngOnInit(): void {}
}

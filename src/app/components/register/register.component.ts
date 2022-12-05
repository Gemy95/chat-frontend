import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat-service/chat.service';
import { firstValueFrom } from 'rxjs';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get name() {
    return this.registerForm.get('name');
  }

  async onSubmit() {
    try {
      await firstValueFrom(
        await this.chatService.registerUser(
          this.registerForm.value.name,
          this.registerForm.value.email
        )
      );
      this.toaster.showSuccess('Successfully created , please check your email', 'Account');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
      this.toaster.showFaield(
        'Failed to create account , Please try again',
        'Error'
      );
    }
  }

  ngOnInit() {}
}

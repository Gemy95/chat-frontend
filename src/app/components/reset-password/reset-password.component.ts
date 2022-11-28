import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ChatService } from '../../services/chat-service/chat.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      activationCode: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get activationCode() {
    return this.resetPasswordForm.get('activationCode');
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  async onSubmit() {
    try {

      await firstValueFrom(
        await this.chatService.resetPasswordUser(
          this.resetPasswordForm.value.activationCode,
          this.resetPasswordForm.value.newPassword,
          this.resetPasswordForm.value.confirmPassword,
        )
      );
      this.toaster.showSuccess('Successfully', 'Activate Account');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
      this.toaster.showFaield('Failed to active account , Please try again', 'Error');
    }
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.resetPasswordForm.patchValue({activationCode:params?.['code']});
      }
    );
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'chat-room', component: ChatRoomComponent, canActivate:[AuthenticationGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

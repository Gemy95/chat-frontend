import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from  '@angular/common/http';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { ToastrModule } from 'ngx-toastr';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { LogoutComponent } from './components/logout/logout.component';

const config: SocketIoConfig = {
	url: environment.SOCKET_Url, // socket server url;
	options: {
		transports: ['websocket','polling'],
    auth: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
	}
}

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ChatRoomComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config), 
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
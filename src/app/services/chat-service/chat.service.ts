import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  registerUser(name: string, email: string) {
    const body = new HttpParams({
      fromObject: {
        name,
        email,
      },
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(`${environment.API_URL}/user/register`, body, {
      headers,
    });
  }

  loginUser(email: string, password: string) {
    const body = new HttpParams({
      fromObject: {
        email,
        password,
      },
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(`${environment.API_URL}/user/login`, body, {
      headers,
    });
  }

  resetPasswordUser(activationCode: string, newPassword: string, confirmPassword:string) {
    const body = new HttpParams({
      fromObject: {
        activationCode,
        newPassword,
        confirmPassword,
      },
    });
 console.log("body=",body)
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.patch(`${environment.API_URL}/user/reset-password`, body, {
      headers,
    });
  }
}

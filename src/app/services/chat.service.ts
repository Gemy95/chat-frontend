import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  registerUser(name: string, email:string) {
    const body = new HttpParams({
      fromObject: {
        name,
        email,
      },
    });

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(`${environment.API_URL}/user/register`, body, {
      headers,
    });
  }

  loginUser() {
    const body = new HttpParams({
      fromObject: {
        Name: 'name',
        Email: 'email',
      },
    });

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${environment.API_URL}/user/login`, body, {
      headers,
    });
  }

  resetPasswordUser() {
    const body = new HttpParams({
      fromObject: {
        activationCode: 'name',
        newPassword: 'email',
        confirmPassword: 'aaa',
      },
    });

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${environment.API_URL}/user/login`, body, {
      headers,
    });
  }
}

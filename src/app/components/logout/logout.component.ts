import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor( private authService: AuthService) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.authService.isAuth.next(false);
  }
}

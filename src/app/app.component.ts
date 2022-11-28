import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  isAuth: boolean = false;

  constructor(private authService: AuthService) {
    const token = localStorage.getItem('token');
    console.log('token=', token);
    if (!token || token == '') {
      console.log('here1');
      this.authService.isAuth.next(false);
    } else {
      this.authService.isAuth.next(true);
    }
  }

  ngOnInit(): void {
    this.authService.isAuth.subscribe((data) => {
      this.isAuth = data;
    });
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showSignup = false;


  constructor(private authService: AuthService, private router: Router) {}



  signup(value: { firstname: string,lastname: string, email: string, password: string }) {
    this.authService.signup(value)
      .subscribe(
        res => {
          const token = res.token;
          const email = res.email;
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
          console.log(res);
          this.router.navigate(['/myaccount']);

        },
        err => {
          console.log(err);
        }
      );
  }

  login(value: { email: string, password: string }) {
    this.authService.login(value)
      .subscribe(
        res => {
          const token = res.token;
          const email = res.email;
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
          console.log(res);
          this.router.navigate(['/myaccount']);
        },
        err => {
          console.log(err);
        }
      );
  }
}

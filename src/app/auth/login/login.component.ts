import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { LoginDTO } from 'src/app/shared/DTO/LoginDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  focus: boolean | undefined;
  focus1: boolean | undefined;
  showValidations: boolean = false;
  validCredentials: boolean = true;
  loginSuccess: boolean = false;
  stored_username: string | null = localStorage.getItem('username_Eventopia');
  stored_password: string | null = localStorage.getItem('password_Eventopia');

  constructor(private authService: AuthService, private router: Router) {}

  private passwordPattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(this.stored_username, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    password: new FormControl(this.stored_password, [
      Validators.required,
      Validators.pattern(this.passwordPattern),
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
    rememberMe: new FormControl(false),
  });

  login(): void {
    this.showValidations = true;
    this.validCredentials = true;
    this.loginSuccess = false;
    if (!this.loginForm.valid) return;

    let loginDTO: LoginDTO = {
      Username: this.loginForm.get('username')?.value,
      Password: this.loginForm.get('password')?.value,
    };

    this.authService.login(loginDTO).subscribe(
      (res: any) => {
        this.validCredentials = true;
        this.loginSuccess = true;
        localStorage.setItem('jwtToken', res.content);
        if (this.loginForm.get('rememberMe')?.value === true)
          this.rememberMeOn();
      },
      (err) => {
        this.validCredentials = false;
        console.log(err);
      }
    );
  }

  private rememberMeOn() {
    localStorage.setItem(
      'username_Eventopia',
      this.loginForm.get('username')?.value
    );
    localStorage.setItem(
      'password_Eventopia',
      this.loginForm.get('password')?.value
    );
  }

  clearRememberMeItems() {
    localStorage.removeItem('username_Eventopia');
    localStorage.removeItem('password_Eventopia');
    this.loginForm.reset();
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body?.classList?.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar?.classList?.add('navbar-transparent');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body?.classList?.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar?.classList?.remove('navbar-transparent');
  }
}

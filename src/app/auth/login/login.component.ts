import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
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

  constructor(private authService: AuthService) {}

  private passwordPattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordPattern),
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
  });

  login(): void {
    this.showValidations = true;
    if (!this.loginForm.valid)
      return;
    console.log(this.loginForm.value);
    let loginDTO: LoginDTO = {
      Username: this.loginForm.get('username')?.value,
      Password: this.loginForm.get('password')?.value,
    };
    this.authService.login(loginDTO).subscribe(
      (res: any) => {
        this.validCredentials = true;
        this.loginSuccess = true;
        sessionStorage.setItem('jwtToken', res.content);
        console.log('in loginHttpResponse getting from session ' + sessionStorage.getItem('jwtToken'));
        
      },
      (err) => {
        this.validCredentials = false;
        console.log(err);
      }
    );
  }

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}

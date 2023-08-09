import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginDTO } from 'src/app/shared/DTO/LoginDTO';
import { RegisterDTO } from 'src/app/shared/DTO/RegisterDTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  focus: boolean | undefined;
  focus1: boolean | undefined;
  focus2: boolean | undefined;
  showValidations: boolean = false;
  registerSuccess: boolean = false;
  usernameAlreadyExists: boolean = false;
  emailAlreadyExists: boolean = false;

  constructor(private authService: AuthService) {}

  private passwordPattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

  registerForm: FormGroup = new FormGroup({
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
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]),
  });

  register(): void {
    this.showValidations = true
    this.usernameAlreadyExists = false;
    this.emailAlreadyExists = false;
    if (!this.registerForm.valid) return;

    let registerDTO: RegisterDTO = {
      Username: this.registerForm.get('username')?.value,
      Password: this.registerForm.get('password')?.value,
      Email: this.registerForm.get('email')?.value,
    };

    this.authService.register(registerDTO).subscribe(
      (res: any) => {
        this.registerSuccess = true;
        console.log(res);
      },
      (error: HttpErrorResponse) => {
        this.registerSuccess = false;
        if (error.error && error.error.error) {
          if (error.error.error === 'username already exists') {
            this.usernameAlreadyExists = true;
          }
          if (error.error.error === 'email already exists') {
            this.emailAlreadyExists = true;
          }
        } else {
          console.log(error);
        }
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

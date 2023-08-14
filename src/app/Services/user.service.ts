import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPointURL } from 'src/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private serviceURL = endPointURL + 'User/';

  constructor(private http: HttpClient) {}

  forgotPassword(email: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<string>(
      `${this.serviceURL}ForgotPassword`,
      `\"${email}\"`,
      httpOptions
    );
  }

  checkPasswordResetToken(email: string, code: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<string>(
      `${this.serviceURL}CheckPasswordResetToken/${email}`,
      `\"${code}\"`,
      httpOptions
    );
  }

  resetForgottenPassword(email: string, newPassword: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<string>(
      `${this.serviceURL}ResetForgottenPassword/${email}`,
      `\"${newPassword}\"`,
      httpOptions
    );
  }
}

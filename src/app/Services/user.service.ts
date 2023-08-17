import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { endPointURL } from 'src/constants/constants';
import { User } from '../shared/Data/User';

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

  getUserById(id:number): Observable<Object>{
    return this.http.get(this.serviceURL + `GetUserById/${id}`).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err:any) => {
        return of(false);
      })
    );
  }

  users:any = [{}]
  GetAllRegisteredUsersDetails(): void {
    this.http.get<User[]>(this.serviceURL + 'GetAllRegisteredUsersDetails').subscribe(
      (res: User[]) => {
          this.users = res.filter((x) => x.username !== 'Admin');
      },
      (err) => {
          console.log(err);
      }
    );
  }
}

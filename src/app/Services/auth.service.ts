import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '../shared/DTO/LoginDTO';
import { endPointURL } from 'src/constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serviceURL = endPointURL + 'Auth/';
  constructor(private http: HttpClient) {}

  login(loginDTO: LoginDTO): Observable<string> {
    return this.http.post<string>(this.serviceURL + 'Login', loginDTO);
  }
}

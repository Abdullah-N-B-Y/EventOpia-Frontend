import { Injectable } from '@angular/core';
import { LoginDTO } from '../shared/DTO/LoginDTO';
import { endPointURL } from 'src/constants/constants';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../shared/DTO/RegisterDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serviceURL = endPointURL + 'Auth/';
  constructor(private http: HttpClient) {} 

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post<string>(this.serviceURL + 'Login', loginDTO);
  }

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post<string>(this.serviceURL + 'Register', registerDTO);
  }
}

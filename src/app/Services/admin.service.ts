import { Injectable } from '@angular/core';
import { endPointURL } from 'src/constants/constants';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  banUser(username: string): void {
    const headers = {
      'Content-Type': 'application/json',
      'username': username
    };
  
    this.http.put<File>(`${endPointURL}Admin/BannedUser/${username}`, '', { headers }).subscribe(
      response => {
        
      },
      error => {
        console.log('err=> '+error)
      }
    );
  }
  unbanUser(username: string){
    const headers = {
      'Content-Type': 'application/json',
      'username': username
    };
  
    this.http.put<File>(`${endPointURL}Admin/UnbannedUser/${username}`, '', { headers }).subscribe(
      response => {
        
      },
      error => {
        console.log('err=> '+error)
      }
    );
  }
}

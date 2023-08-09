import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  updateProfile (body:any){
    this.http.put('https://localhost:4200/api/Profile/UpdateProfile',body).subscribe((resp:any)=>{
      console.log(resp);
    },err=>{
      console.log(err.status);
    })
  }
  changePassword (id:number, body:any){
    this.http.put('https://localhost:4200/api/User/UpdatePassword/{id}',body).subscribe((resp:any)=>{
      console.log(resp);
    },err=>{
      console.log(err.status);
    })
  }
}

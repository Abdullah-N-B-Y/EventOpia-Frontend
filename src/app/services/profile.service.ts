import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPointURL } from 'src/constants/constants';
import { User } from '../shared/Data/User';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  updateProfile (body:any){
    this.http.put(endPointURL+'/Profile/UpdateProfile',body).subscribe((resp:any)=>{
      console.log(resp);
    },err=>{
      console.log(err.status);
    })
  }
  changePassword (id:number, body:any){
    this.http.put(endPointURL+`/User/UpdatePassword/${id}`,body).subscribe((resp:any)=>{
      console.log(resp);
    },err=>{
      console.log(err.status);
    })
  }
  getUserById(id:number):Observable<any>{
    return this.http.get<User>(endPointURL+`User/GetUserById/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPointURL } from 'src/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient) { }

  events :any=[{}] ; 
  getAllEvents (){
    this.http.get(endPointURL + 'Event/GetAllEvents').subscribe((resp:any)=>{
      this.events=resp;
      console.log(this.events);
    },err=>{
      console.log(err.status);
      
    })
  }
  editEvent(event:any){
    this.http.put(endPointURL + 'Event/UpdateEvent',event).subscribe((resp:any)=>{
      this.events=resp;
    },err=>{
      console.log(err.status);
      
    })
  }
  delteEvent(id:number){
    this.http.delete(endPointURL + `Event/DeleteEvent/${id}`).subscribe((resp:any)=>{
      this.events=resp;
    },err=>{
      console.log(err.status);
      
    })
  }
  getEvent(id:number){
    this.http.get(endPointURL + `Event/GetEventByID/${id}`).subscribe((resp:any)=>{
      this.events=resp;
    },err=>{
      console.log(err.status);
    })
  }
}

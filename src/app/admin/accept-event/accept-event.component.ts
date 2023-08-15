import { Component,OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-accept-event',
  templateUrl: './accept-event.component.html',
  styleUrls: ['./accept-event.component.css']
})
export class AcceptEventComponent implements OnInit{
  events:any;
  constructor(private adminService:AdminService, public eventService:EventService){}
  
  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((res: any)=>{
      this.events = res;
    },(err)=>{
      console.log(`err=> ${err}`);
    })
  }

  acceptanceEvent(id: number,status:string){
    this.adminService.acceptanceEvent(id,status);
  }
  
}

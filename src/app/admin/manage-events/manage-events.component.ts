import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit{
  events:any;
  constructor(public eventService: EventsService){}
  
  ngOnInit(): void {
    this.eventService.getAllEvents();
  }

  editEvent(event:any){
    this.eventService.editEvent(event);
  }
  deleteEvent(id:number){
    this.eventService.delteEvent(id);
  }
  detailsEvent(id:number){
    this.eventService.getEvent(id)
  }
}

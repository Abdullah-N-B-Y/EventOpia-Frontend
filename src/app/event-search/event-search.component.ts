import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchbydateService } from '../services/searchbydate.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent implements OnInit {
  searchForm!: FormGroup;
  events: any[] = [];
  searchName: string = '';

  constructor(
    private searchbydateService: SearchbydateService,
    private formBuilder: FormBuilder,
    private eventService : EventService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.loadAllEvents(); 
  }

 
  loadAllEvents() {
    this.searchbydateService.getAllActiveEventsWithDetails()
      .subscribe((result: any) => {
        this.events = result;
      });
  }

  searchEvents() {
    if (this.searchForm.valid) {
      const startDate = this.searchForm.value.startDate;
      const endDate = this.searchForm.value.endDate;
      this.searchbydateService.searchEventsBetweenDates(startDate, endDate)
        .subscribe((result) => {
          this.events = result;
        });
    }
  }

  searchEventsByName() {
    if (this.searchName) {
      this.searchbydateService.searchEventsByName(this.searchName)
        .subscribe((result) => {
          this.events = result;
        });
    }
  }
}

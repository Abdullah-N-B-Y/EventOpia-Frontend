import { Component, OnInit } from '@angular/core';
import { SearchbydateService } from '../Services/searchbydate.service';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent implements OnInit {
  startDate!: Date;
  endDate!: Date;
  events: any[] = [];
  searchName: string = '';

  constructor(private searchbydateService: SearchbydateService) {}

  ngOnInit(): void {
    this.searchEvents();
  }

  searchEvents() {
    if (this.startDate && this.endDate) {
      const startDateISO = this.startDate.toISOString();
      const endDateISO = this.endDate.toISOString();
      this.searchbydateService.searchEventsBetweenDates(startDateISO, endDateISO)
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

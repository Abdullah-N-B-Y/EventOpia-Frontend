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

  constructor(private searchbydateService: SearchbydateService) {}

  ngOnInit(): void {
    this.searchEvents();
  }

  searchEvents() {
    if (this.startDate && this.endDate) {
      const dates = { startDate: this.startDate, endDate: this.endDate };
      this.searchbydateService.searchEventsBetweenDates(this.startDate.toISOString(), this.endDate.toISOString())
        .subscribe((result) => {
          this.events = result;
        });
    }
  }
}

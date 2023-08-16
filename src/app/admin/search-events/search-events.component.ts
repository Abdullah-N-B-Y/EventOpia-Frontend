import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { EventService } from 'src/app/services/event.service';
import { EventWithDetailsDTO } from 'src/app/shared/DTO/EventWithDetailsDTO';

@Component({
    selector: 'app-search-events',
    templateUrl: './search-events.component.html',
    styleUrls: ['./search-events.component.css'],
})
export class SearchEventsComponent {
    constructor(private eventService: EventService, private formBuilder: FormBuilder) {}

    allEvents: EventWithDetailsDTO[] = [];
    shownEvents: EventWithDetailsDTO[] = [];
    eventFilterForm!: FormGroup;

    ngOnInit(): void {
        this.eventFilterForm = this.formBuilder.group({
            startDate: new FormControl(new Date().toISOString().slice(0, 16)),
            endDate: new FormControl(new Date().toISOString().slice(0, 16)),
            eventFilter: ['all'],
        });
        this.eventService.getAllEventsWithDetails().subscribe(
            (res: EventWithDetailsDTO[]) => {
                console.log(res);
                this.allEvents = res;
                this.shownEvents = res;
            },
            (err) => {
                console.log('couldnt get all events ', err);
            }
        );
    }

    updateShownEvents(startDate: Date, endDate: Date, filter: string) {
        this.shownEvents = [];

        if (filter === 'all') {
            this.shownEvents = this.allEvents.filter((event) => event.startDate >= startDate && event.endDate <= endDate);
        } else {
            this.shownEvents = this.allEvents.filter(
                (event) => event.startDate >= startDate && event.endDate <= endDate && event.status === filter
            );
        }
    }

    onSubmit() {
        const startDateValue: Date = this.eventFilterForm.get('startDate')?.value;
        const endDateValue: Date = this.eventFilterForm.get('endDate')?.value;
        const eventFilterValue: string = this.eventFilterForm.get('eventFilter')?.value;

        console.log('Start Date:', startDateValue);
        console.log('End Date:', endDateValue);
        console.log('Event Filter:', eventFilterValue);

        this.updateShownEvents(startDateValue, endDateValue, eventFilterValue);
    }

    resetForm() {
        this.eventFilterForm.reset();
        this.shownEvents = this.allEvents;
    }

    getDataURL(base64String: string | undefined) {
        return `data:image/png;base64,${base64String}`;
    }
}

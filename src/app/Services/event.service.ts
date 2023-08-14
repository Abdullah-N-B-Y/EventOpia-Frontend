import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPointURL } from 'src/constants/constants';
import { Event_ } from 'src/app/shared/Data/Event_';
import { Observable, catchError } from 'rxjs';
import { EventWithDetailsDTO } from '../shared/DTO/EventWithDetailsDTO';
import { createFormDataFromObject } from '../shared/utilities/createFormDataFromObject';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private serviceURL = endPointURL + 'Event/';

    constructor(private http: HttpClient) {}

    getAllActiveEvents(): Observable<Event_[]> {
        return this.http.get<Event_[]>(this.serviceURL + 'GetAllActiveEvents');
    }

    getAllEvents(): Observable<Event_[]> {
        return this.http.get<Event_[]>(this.serviceURL + 'GetAllEvents');
    }

    getAllActiveEventsWithDetails(): Observable<EventWithDetailsDTO[]> {
        return this.http.get<EventWithDetailsDTO[]>(this.serviceURL + 'GetAllActiveEventsWithDetails');
    }

    getAllEventsWithDetails(): Observable<EventWithDetailsDTO[]> {
        return this.http.get<EventWithDetailsDTO[]>(this.serviceURL + 'GetAllEventsWithDetails');
    }

    createEvent(event: Event_): Observable<boolean> {
        let formData: FormData = new FormData();
        formData = createFormDataFromObject(event);
        return this.http.post<boolean>(this.serviceURL + 'CreateNewEvent', formData).pipe(
            catchError((err) => {
                console.log(err);
                throw err;
            })
        );
    }
}

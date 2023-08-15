import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPointURL } from 'src/constants/constants';
import { Booking } from '../shared/Data/Booking';

@Injectable({
    providedIn: 'root',
})
export class BookingService {
    private serviceURL = endPointURL + 'Booking/';
  constructor(private http: HttpClient) { }
  
  registerForEvent(booking: Booking): Observable<any> {
    return this.http.post<any>(this.serviceURL + 'CreateNewBooking', booking);
  }
}

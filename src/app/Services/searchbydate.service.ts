import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SearchbydateService {

  constructor(private http: HttpClient) { }

  searchEventsBetweenDates(startDate: string, endDate: string): Observable<any> {
    const dates = { startDate, endDate };
    return this.http.post('https://localhost:7189/api/Event/SearchEventsBetweenDates', dates);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { createFormDataFromObject } from '../shared/utilities/createFormDataFromObject';

@Injectable({
  providedIn: 'root'
})
export class SearchbydateService {

  constructor(private http: HttpClient) { }

  searchEventsBetweenDates(startDate: string, endDate: string): Observable<any> {
    const dates = { startDate: startDate,endDate: endDate };
    let date : FormData = new FormData();
    
    date = createFormDataFromObject(dates)
    return this.http.post('https://localhost:7189/api/Event/SearchEventsBetweenDates', date);
  }
}

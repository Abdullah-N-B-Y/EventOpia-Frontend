import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchbydateService {
  getAllActiveEventsWithDetails() {
    throw new Error('Method not implemented.');
  }
  
  constructor(private http: HttpClient) { }

  searchEventsBetweenDates(startDate: string, endDate: string): Observable<any> {
    const data = {
      startDate: startDate,
      endDate: endDate
    };

    let formData: FormData = this.createFormDataFromObject(data);

    return this.http.post('https://localhost:7189/api/Event/SearchEventsBetweenDates', formData);
  }

  searchEventsByName(name: string): Observable<any> {
    const data = {
      name: name
    };

    let formData: FormData = this.createFormDataFromObject(data);

    return this.http.post('https://localhost:7189/api/Event/SearchEventsByName', formData);
  }

  getAllEvents(): Observable<any> {
    return this.http.get<any>('https://localhost:7189/api/Event/GetAllEvents');
  }

  private createFormDataFromObject(data: any): FormData {
    let formData = new FormData();
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
    return formData;
  }
}

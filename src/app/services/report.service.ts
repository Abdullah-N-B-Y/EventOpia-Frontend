import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getBenefitsReport(startDate: Date, endDate: Date): Observable<any> {
    const url = 'https://localhost:7189/api/Admin/BenefitsReport'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    
    return this.http.post(url, body, { headers });
  }
}
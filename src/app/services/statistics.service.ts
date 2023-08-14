import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class StatisticsService {
  constructor(private http: HttpClient) {}

  statistics: any = {};
  getStatistics(): Observable<any> {
    return this.http.get('https://localhost:7189/api/Admin/Statistics');
  }
}

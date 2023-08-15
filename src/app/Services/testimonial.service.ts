import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private baseUrl = 'https://localhost:7189/api/Testimonial';

  constructor(private http: HttpClient) { }

  createTestimonial(testimonial: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/CreateNewTestimonial`, testimonial);
  }

  // Add other methods for getting, updating, and deleting testimonials
}
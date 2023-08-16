import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TestimonialService {
    private baseUrl = 'https://localhost:7189/api/Testimonial';

    constructor(private http: HttpClient) {}

    createTestimonial(testimonial: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(`${this.baseUrl}/CreateNewTestimonial`, testimonial, {
            headers,
        });
    }

    GetAllTestimonials(): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetAllTestimonials`);
    }

    UpdateTestimonial(testimonial: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/UpdateTestimonial`, testimonial);
    }
}

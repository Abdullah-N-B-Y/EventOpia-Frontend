import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPointURL } from 'src/constants/constants';
import { PaymentDetailsDTO } from '../shared/DTO/PaymentDetailsDTO ';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    private serviceURL = endPointURL + 'Payment/';
    constructor(private http: HttpClient) {}

    payForRegisterEvent(paymentDetailsDTO: PaymentDetailsDTO): Observable<any> {
        return this.http.post<any>(this.serviceURL + 'PayForEventRegister', paymentDetailsDTO);
    }

    payForCreateEvent(paymentDetailsDTO: PaymentDetailsDTO): Observable<any> {
        return this.http.post<any>(this.serviceURL + 'PayForNewEvent', paymentDetailsDTO);
    }
}

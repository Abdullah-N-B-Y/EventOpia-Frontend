import { Injectable } from '@angular/core';
import { ContactUsEntry } from '../shared/Data/ContactUsEntry';
import { createFormDataFromObject } from '../shared/utilities/createFormDataFromObject';
import { endPointURL } from 'src/constants/constants';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) { }
  private serviceURL = endPointURL + 'ContactUsEntries/';

  createContactUs(obj: any): Observable<boolean> {
    let formData: FormData = new FormData();
    formData = createFormDataFromObject(obj);
    return this.http.post<boolean>(this.serviceURL + 'CreateEntry', formData).pipe(
      map((res: any)=>{
        console.error('success sending message');
        return true;
      }),
      catchError((err) => {
        console.error('Error sending message', err.messageReceivers);
        return of(false);
      })
    );
  }
}


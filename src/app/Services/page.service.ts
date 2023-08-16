import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { endPointURL } from 'src/constants/constants';
import { Page } from '../shared/Data/Page';
import { createFormDataFromObject } from '../shared/utilities/createFormDataFromObject';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private serviceURL = endPointURL + 'Page/';
    constructor(private http: HttpClient) {}

  getAllPages(): Observable<any> {
    return this.http.get<any>(this.serviceURL + 'GetAllPages');
  }

  getPageById(id: number): Observable<Page> {
    return this.http.get<Page>(this.serviceURL + `GetPageById/${id}`);
  }

  createPage(page:any): Observable<boolean>{
    let formData = new FormData();
    formData = createFormDataFromObject(page);
    return this.http.post(this.serviceURL + 'CreatePage',formData).pipe(
      map((resp: any) => {
        return true;
      }),
      catchError((err:any) => {
        return of(false);
      })
    );
  }

  editPage(page:any): Observable<boolean>{
    let formData = new FormData();
    formData = createFormDataFromObject(page);
    return this.http.put(this.serviceURL + 'UpdatePage',formData).pipe(
      map((resp: any) => {
        return true;
      }),
      catchError((err:any) => {
        return of(false);
      })
    );
  }

  deletePage(id:number): Observable<boolean>{
    return this.http.delete(this.serviceURL + `DeletePage/${id}`).pipe(
      map((resp: any) => {
        return true;
      }),
      catchError((err:any) => {
        return of(false);
      })
    );
  }
}

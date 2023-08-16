import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { endPointURL } from 'src/constants/constants';
import { Category } from '../shared/Data/Category';
import { createFormDataFromObject } from '../shared/utilities/createFormDataFromObject';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private serviceURL = endPointURL + 'Category/';
  constructor(private http: HttpClient) { }
  
  categories:any = [{}]
  getAllCategories(): void {
    this.http.get<Category[]>(this.serviceURL + 'GetAllCategories').subscribe(
      (res: Category[]) => {
          this.categories = res;
      },
      (err) => {
          console.log(err);
      }
    );
  }

  getCategoryById(id: number): Observable<Object>{
    return this.http.get(this.serviceURL + `GetCategoryById/${id}`).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err:any) => {
        return of(false);
      })
    );
  }

  category:Category={};
  getCategoryByName(name: string): Observable<Object>{
    return this.http.get(this.serviceURL + `GetCategoryByName/${name}`).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err:any) => {
        return of(false);
      })
    );
  }

  createCategory(category:any): Observable<boolean>{
    let formData = new FormData();
    formData = createFormDataFromObject(category);
    return this.http.post(this.serviceURL + 'CreateCategory',formData).pipe(
      map((resp: any) => {
        return true;
      }),
      catchError((err:any) => {
        return of(false);
      })
    );
  }

  editCategory(category:any): Observable<boolean>{
    let formData = new FormData();
    formData = createFormDataFromObject(category);
    return this.http.put(this.serviceURL + 'UpdateCategory',formData).pipe(
      map((resp: any) => {
        return true;
      }),
      catchError((err:any) => {
        return of(false);
      })
    );
  }

  deleteCategory(id:number): Observable<boolean>{
    return this.http.delete(this.serviceURL + `DeleteCategory/${id}`).pipe(
      map((resp: any) => {
        return true;
      }),
      catchError((err:any) => {
        return of(false);
      })
    );
  }
}

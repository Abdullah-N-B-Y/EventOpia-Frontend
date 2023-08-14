import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPointURL } from 'src/constants/constants';
import { Category } from '../shared/Data/Category';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private serviceURL = endPointURL + 'Category/';
  constructor(private http: HttpClient) { }
  
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.serviceURL + 'GetAllCategories');
  }
}

import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Category } from '../../models/category.model';
import { BASE_CATEGORY_URL } from './../../constants/urls';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class CategoryService {
  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<any> {
    return this.http.get(BASE_CATEGORY_URL).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  setCategory(category: Category): Observable<any> {
    return this.http.post(BASE_CATEGORY_URL, category).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  updateCategory(category: Category, categoryId: string): Observable<any> {
    return this.http.put(`${BASE_CATEGORY_URL}/${categoryId}`, category).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${BASE_CATEGORY_URL}/${categoryId}`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }
}

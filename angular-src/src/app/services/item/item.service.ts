import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BASE_ITEM_URL } from './../../constants/urls';

import { Item } from '../../models/item.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class ItemService {
  constructor(
    private http: HttpClient
  ) { }

  addItem(item: Item): Observable<any> {
    return this.http.post(BASE_ITEM_URL, item).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${BASE_ITEM_URL}/${itemId}`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  updateItem(itemId: string, item: any): Observable<any> {
    return this.http.put(`${BASE_ITEM_URL}/${itemId}`, item).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  deleteAllItems(): Observable<any> {
    return this.http.delete(`${BASE_ITEM_URL}/delete/all`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }
}

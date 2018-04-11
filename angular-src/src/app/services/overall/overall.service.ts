import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { OVERALL_PRODUCTS_URL, OVERALL_ORDERS_URL } from './../../constants/urls';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class OverallService {
  constructor(
    private http: HttpClient
  ) { }

  getOverallProducts(): Observable<any> {
    return this.http.get(OVERALL_PRODUCTS_URL).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  getOverallOrders(): Observable<any> {
    return this.http.get(OVERALL_ORDERS_URL).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BASE_ORDER_URL } from '../../constants/urls';

import { Order } from '../../models/order.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  setOrder(order: Order): Observable<any> {
    return this.http.post(BASE_ORDER_URL, order).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }
}

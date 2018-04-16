import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Product } from '../../models/product.model';
import { BASE_PRODUCT_URL } from './../../constants/urls';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductService {
  constructor(
    private http: HttpClient
  ) { }

  getProducts(currentPage: number, limitPage: number): Observable<any> {
    return this.http.get(`${BASE_PRODUCT_URL}/${currentPage}/${limitPage}`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  setProduct(product: Product): Observable<any> {
    return this.http.post(BASE_PRODUCT_URL, this.createFormData(product)).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  updateProduct(product: Product, productId: string): Observable<any> {
    return this.http.put(`${BASE_PRODUCT_URL}/${productId}`, this.createFormData(product)).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  createFormData(product: Product): FormData {
    const fd = new FormData();
    fd.append('picture', product.picture);
    fd.append('product', JSON.stringify(product));
    return fd;
  }
}

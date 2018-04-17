import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './../../models/user.model';
import { Customer } from '../../models/customer.model';
import { LOGIN_URL, REGISTER_URL, CHECK_TOKEN_URL, CHECK_ROLE_OF_USER } from './../../constants/urls';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  private _token: string;

  public authSubject: Subject<any> = new Subject<any>();
  public authFullname: Subject<any> = new Subject<any>();
  public userData: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.token = localStorage.getItem('user_token');
  }

  get token(): string {
    return this._token;
  }

  set token(newToken: string) {
    if (newToken !== null) {
      this._token = newToken;
      localStorage.setItem('user_token', newToken);
    }
  }

  login(user: User): Observable<any> {
    return this.http.post(LOGIN_URL, user).map((res: any) => {
      let data = res.data;
      if (data) {
        this.token = data.token;
        this.userData = data.userData;
        this.authFullname.next(data.userData.firstname + ' ' + data.userData.lastname);
        this.authSubject.next(true);
        this.navigateToDefaultRouteByRole();
        return true;
      } else {
        return false;
      }
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  register(customer: Customer): Observable<any> {
    return this.http.post(REGISTER_URL, customer).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  navigateToDefaultRouteByRole() {
    switch (this.userData.role) {
      case 'customer':
        this.router.navigate(['/']);
        break;
      case 'admin':
        this.router.navigate(['/members/admin/products']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('user_token');
    this.router.navigate(['/']);
    this.authSubject.next(false);
    this.authFullname.next(null);
  }

  checkToken(existToken?: string): Observable<any> {
    let token;

    if (existToken) {
      token = {
        token: existToken
      };
    } else {
      token = {
        token: this.token
      };
    }

    return this.http.post(CHECK_TOKEN_URL, token).map((res: any) => {
      if (!this.userData) {
        this.userData = res.data;
      }
      return res.data;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  checkUserAfterRefresh() {
    if (localStorage.getItem('user_token')) {
      this.checkToken().subscribe((res: any) => {
        this.authSubject.next(true);
        this.authFullname.next(res.firstname + ' ' + res.lastname);
      }, (err) => {
        this.logout();
      });
    } else {
      this.authSubject.next(false);
      this.authFullname.next(null);
    }
  }

  checkRoleOfUser(role: string) {
    return this.http.post(`${CHECK_ROLE_OF_USER}/${role}`, null).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }
}

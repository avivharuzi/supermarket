import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class CustomerGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authService.checkRoleOfUser('customer').subscribe((res: any) => {
        console.log('true');
        resolve(true);
      }, (err) => {
        console.log('false');
        resolve(false);
      });
    });
  }

  canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }
}

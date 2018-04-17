import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authService.checkRoleOfUser('admin').subscribe((res: any) => {
        resolve(true);
      }, (err) => {
        resolve(false);
      });
    });
  }

  canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }
}

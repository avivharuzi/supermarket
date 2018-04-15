import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;

  public fullname: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.checkUserAfterRefresh();
    this.authSubject();
  }

  authSubject(): void {
    this.authService.authSubject.subscribe((res: any) => {
      this.isLoggedIn = res;
    });

    this.authService.authFullname.subscribe((res: any) => {
      this.fullname = res;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}

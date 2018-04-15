import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isLoggedIn: boolean;

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
  }
}

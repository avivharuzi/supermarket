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
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
  }
}

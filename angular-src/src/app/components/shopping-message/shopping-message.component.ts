import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-shopping-message',
  templateUrl: './shopping-message.component.html',
  styleUrls: ['./shopping-message.component.scss']
})
export class ShoppingMessageComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }
}

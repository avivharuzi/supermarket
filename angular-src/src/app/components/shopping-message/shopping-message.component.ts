import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-shopping-message',
  templateUrl: './shopping-message.component.html',
  styleUrls: ['./shopping-message.component.scss']
})
export class ShoppingMessageComponent implements OnInit {
  public customerMessage: string;

  constructor(
    public authService: AuthService,
    public cartService: CartService
  ) { }

  ngOnInit() {
  }
}

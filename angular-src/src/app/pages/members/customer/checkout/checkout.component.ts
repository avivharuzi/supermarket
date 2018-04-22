import { Component, OnInit } from '@angular/core';

import { CartService } from '../../../../services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(
    public cartService: CartService
  ) { }

  ngOnInit() {
  }
}

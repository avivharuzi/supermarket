import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService } from '../../../../services/cart/cart.service';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit {
  constructor(
    public cartService: CartService
  ) { }

  ngOnInit() {
    if (!this.cartService.isCart) {
      this.cartService.setCart();
    }
  }
}

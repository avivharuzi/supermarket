import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService } from '../../../../services/cart/cart.service';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit {
  public isActive: boolean;

  constructor(
    public cartService: CartService
  ) {
    this.isActive = true;
  }

  ngOnInit() {
    if (!this.cartService.isCart) {
      this.cartService.setCart();
    }
  }
}

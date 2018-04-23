import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../../../services/cart/cart.service';
import { OrderService } from '../../../../services/order/order.service';

import { DOWNLOAD_RECIPE_URL } from '../../../../constants/urls';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public downloadRecipe: string;

  constructor(
    public cartService: CartService,
    public orderService: OrderService,
    private router: Router
  ) {
    this.downloadRecipe = DOWNLOAD_RECIPE_URL;
  }

  ngOnInit() {
    if (this.cartService.cart && this.cartService.cart.items.length) {
      return;
    } else {
      this.router.navigateByUrl('/');
    }
  }

  confirm() {
    this.orderService.resetOrder();
    this.router.navigateByUrl('/');
  }
}

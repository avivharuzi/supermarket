import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  constructor(
    public cartService: CartService
  ) { }

  ngOnInit() {}
}

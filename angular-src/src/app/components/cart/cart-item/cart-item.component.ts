import { Component, OnInit, Input } from '@angular/core';

import { ActionService } from '../../../services/action/action.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() public item: any;
  @Input() public isOrder: boolean;

  public amount: number;

  constructor(
    private actionService: ActionService
  ) { }

  ngOnInit() {
  }

  removeItem() {
    this.actionService.removeCartItem.next(this.item);
  }

  updateItem(amount) {
    this.item.amount = amount;
    this.actionService.updatedCartItem.next(this.item);
  }
}

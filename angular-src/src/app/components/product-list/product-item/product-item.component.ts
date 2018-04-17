import { Component, OnInit, Input } from '@angular/core';

import { ActionService } from '../../../services/action/action.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() public product: any;
  @Input() public customer: boolean;

  constructor(
    private actionService: ActionService
  ) { }

  ngOnInit() {
  }

  onSelectedCartItem(): void {
    this.actionService.selectedCartItem.next(this.product);
  }
}

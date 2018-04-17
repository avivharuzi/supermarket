import { Component, OnInit, Input } from '@angular/core';

import { ActionService } from '../../services/action/action.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() public products: any;
  @Input() public customer: boolean;

  constructor(
    private actionService: ActionService
  ) {}

  ngOnInit() {
  }

  onSelectProduct(product: any): void {
    this.actionService.selectedProduct.next(product);
  }
}

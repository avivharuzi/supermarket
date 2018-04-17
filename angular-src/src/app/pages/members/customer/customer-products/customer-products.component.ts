import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActionService } from '../../../../services/action/action.service';
import { ProductService } from '../../../../services/product/product.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit, OnDestroy {
  public products: any[];
  public currentPage: number;
  public limitPage: number;
  public finished: boolean;

  constructor(
    private productService: ProductService,
    private actionService: ActionService
  ) {
    this.currentPage = 1;
    this.limitPage = 8;
    this.products = new Array<any>();
    this.finished = false;
  }

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy() {
    //
  }

  getProducts(): void {
    if (!this.finished) {
      this.productService.getProducts(this.currentPage, this.limitPage).subscribe((res: any) => {
        if (res.data.length) {
          this.currentPage++;
          this.products = this.products.concat(res.data);
        } else {
          this.finished = true;
        }
      });
    }
  }

  onScroll(): void {
    this.getProducts();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActionService } from '../../../../services/action/action.service';
import { ProductService } from '../../../../services/product/product.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  public products: any[];
  public currentPage: number;
  public limitPage: number;
  public finished: boolean;

  public selectedProduct: any;

  public newProductSub: Subscription;
  public updatedProductSub: Subscription;

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
    this.onNewProduct();
    this.onUpdatedProduct();
  }

  ngOnDestroy() {
    this.newProductSub.unsubscribe();
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

  onNewProduct(): void {
    this.newProductSub = this.actionService.newProduct.subscribe((product: any) => {
      if (this.finished) {
        this.products.push(product);
      }
    });
  }

  onUpdatedProduct(): void {
    this.updatedProductSub = this.actionService.updatedProduct.subscribe((updatedProduct: any) => {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i]._id === updatedProduct._id) {
          this.products[i] = updatedProduct;
        }
      }
    });
  }
}

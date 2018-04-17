import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ProductService } from '../../services/product/product.service';
import { CategoryService } from '../../services/category/category.service';

import { ActionService } from '../../services/action/action.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Input() public customer: boolean;
  public products: any;
  public categories: any;
  public selectedCategories: any;
  public searchValue: string;

  public currentPage: number;
  public limitPage: number;
  public finished: boolean;

  public newProductSub: Subscription;
  public updatedProductSub: Subscription;
  public newCategorySub: Subscription;

  constructor(
    private actionService: ActionService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.currentPage = 1;
    this.limitPage = 8;
    this.products = new Array<any>();
    this.finished = false;
    this.selectedCategories = null;
    this.searchValue = null;
  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.onNewProduct();
    this.onUpdatedProduct();
    this.onNewCategory();
  }

  ngOnDestroy() {
    this.newProductSub.unsubscribe();
  }

  onSelectProduct(product: any): void {
    this.actionService.selectedProduct.next(product);
  }

  getCategories(): void {
    this.categories = this.categoryService.getCategories();
  }

  getProducts(): void {
    if (!this.finished) {
      this.productService.getProducts(this.currentPage, this.limitPage, this.searchValue).subscribe((res: any) => {
        if (res.data.length) {
          this.currentPage++;
          this.products = this.products.concat(res.data);
        } else {
          this.finished = true;
        }
      });
    }
  }

  resetProductsAndGet(): void {
    if (this.searchValue.length > 0) {
      this.currentPage = 1;
      this.finished = false;
      this.products = new Array<any>();
      this.getProducts();
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

  onNewCategory(): void {
    this.newCategorySub = this.actionService.newCategory.subscribe((category: any) => {
      this.getCategories();
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

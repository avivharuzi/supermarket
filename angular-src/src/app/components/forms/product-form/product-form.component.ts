import { Component, OnInit, Input, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validator } from '../../../models/validator.model';

import { CategoryService } from '../../../services/category/category.service';
import { ValidationService } from '../../../services/validation/validation.service';
import { ProductService } from '../../../services/product/product.service';
import { ActionService } from '../../../services/action/action.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Product } from '../../../models/product.model';
import { Message } from '../../../models/message.model';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  public productForm: FormGroup;
  public productMessage: Message;
  public title: string;

  public categories: any[];

  public files: any;

  @Input() public editProduct: any;

  public modalRef: BsModalRef;

  public newCategorySub: Subscription;
  public editProductSub: Subscription;

  constructor(
    private validationService: ValidationService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private modalService: BsModalService,
    private actionService: ActionService
  ) {
    this.title = 'Add Product';
  }

  ngOnInit() {
    this.createProductForm();
    this.getCategories();
    this.onNewCategory();
    this.onEditProduct();
  }

  ngOnDestroy() {
    this.newCategorySub.unsubscribe();
  }

  createProductForm(): void {
    const name = new FormControl(null, [
      Validator.required('Product name')
    ]);

    const price = new FormControl(null, [
      Validator.required('Price')
    ]);

    const category = new FormControl(null, [
      Validator.required('Category')
    ]);

    this.productForm = new FormGroup({
      name,
      price,
      category
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = new Product(
        this.productForm.get('name').value,
        this.getControl('category').value,
        this.getControl('price').value,
        null
      );

      if (this.editProduct) {
        this.updateProduct(product);
      } else {
        this.setProduct(product);
      }
    } else {
      this.validationService.dirtyAllInputs(this.productForm);
    }
  }

  setProduct(product: Product): void {
    if (this.files) {
      product.picture = this.files;

      this.productService.setProduct(product).subscribe((res: any) => {
        this.productMessage = new Message('success', res.message);
        this.resetProductForm();
        this.actionService.newProduct.next(res.data);
      }, (err) => {
        this.productMessage = new Message('danger', err.errors);
      });
    } else {
      this.productMessage = new Message('danger', 'You need to provide image to create product');
    }
  }

  updateProduct(product: Product): void {
    product.picture = this.files;
    product.existName = this.editProduct.name;
    product.existPicture = this.editProduct.picture;

    this.productService.updateProduct(product, this.editProduct._id).subscribe((res: any) => {
      this.productMessage = new Message('success', res.message);
      this.actionService.updatedProduct.next(res.data);
      this.editProduct.picture = res.data.picture;
    }, (err) => {
      this.productMessage = new Message('danger', err.errors);
    });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res;
      if (!this.editProduct) {
        this.productForm.controls['category'].setValue(this.categories[0]._id);
      }
    });
  }

  onChangeFiles(files: any): void {
    this.files = files;
  }

  getControl(controlName: string): any {
    return this.productForm.get(controlName);
  }

  getStatus(controlName: string): string {
    return this.validationService.statusClass(this.getControl(controlName));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  resetProductForm(): void {
    this.productForm.patchValue({
      name: null,
      price: null,
      category: this.categories[0]._id
    });
    this.files = null;
    this.validationService.pristineAllInputs(this.productForm);
  }

  onClose(): void {
    this.productMessage.isOpen = false;
  }

  onNewCategory(): void {
    this.newCategorySub = this.actionService.newCategory.subscribe((category: any) => {
      this.categories.push(category);
    });
  }

  createEditProductForm(): void {
    this.title = 'Edit Product';
    this.productForm.patchValue({
      name: this.editProduct.name,
      price: this.editProduct.price,
      category: this.editProduct.category._id
    });
  }

  onEditProduct(): void {
    this.editProductSub = this.actionService.selectedProduct.subscribe((product) => {
      if (product) {
        this.editProduct = product;
        this.createEditProductForm();
      }
    });
  }

  defaultProductForm(): void {
    this.resetProductForm();
    this.editProduct = null;
  }
}

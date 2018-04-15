import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Validator } from '../../../models/validator.model';

import { CategoryService } from '../../../services/category/category.service';
import { ValidationService } from '../../../services/validation/validation.service';
import { ProductService } from '../../../services/product/product.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Product } from '../../../models/product.model';
import { Message } from '../../../models/message.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  public productForm: FormGroup;
  public productMessage: Message;

  public categories: any[];

  public files: any;

  @Input() public editProduct: any;

  public modalRef: BsModalRef;

  constructor(
    private validationService: ValidationService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.createProductForm();
    this.getCategories();
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
      if (this.files) {
        const product: Product = new Product(
          this.productForm.get('name').value,
          this.getControl('category').value,
          this.getControl('price').value,
          this.files
        );

        this.setProduct(product);
      } else {
        this.productMessage = new Message('danger', 'You need to provide image to create product');
      }
    } else {
      this.validationService.dirtyAllInputs(this.productForm);
    }
  }

  setProduct(product: Product): void {
    this.productService.setProduct(product).subscribe((res: any) => {
      this.productMessage = new Message('success', res.message);
      this.resetProductForm();
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
    }, (err) => {
      console.log(err);
    });
  }

  onChangeFiles(files: any): void {
    this.files = files;
  }

  getControl(controlName: string) {
    return this.productForm.get(controlName);
  }

  getStatus(controlName: string) {
    return this.validationService.statusClass(this.getControl(controlName));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  resetProductForm(): void {
    this.productForm.patchValue({
      name: null,
      price: null
    });
    this.files = null;
    this.validationService.pristineAllInputs(this.productForm);
  }
}

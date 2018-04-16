import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Validator } from '../../../models/validator.model';
import { Category } from '../../../models/category.model';
import { Message } from '../../../models/message.model';

import { CategoryService } from '../../../services/category/category.service';
import { ValidationService } from '../../../services/validation/validation.service';
import { ActionService } from '../../../services/action/action.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  public categoryForm: FormGroup;

  public categoryMessage: Message;

  @Input() public editCategory: any;

  constructor(
    private categoryService: CategoryService,
    private validationService: ValidationService,
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.createCategoryForm();
    this.checkCategoryEdit();
  }

  createCategoryForm(): void {
    const name = new FormControl('', [
      Validator.required('Category name')
    ]);

    this.categoryForm = new FormGroup({
      name
    });
  }

  setCategoryForm(): void {
    if (this.categoryForm.valid) {
      if (this.editCategory) {
        this.setEditCategory();
      } else {
        this.setAddCategory();
      }
    }
  }

  setAddCategory() {
    const category: Category = new Category(
      this.categoryForm.get('name').value
    );

    this.categoryService.setCategory(category).subscribe((res: any) => {
      if (res) {
        this.categoryMessage = new Message('success', res.message);
        this.categoryForm.reset();
        this.actionService.newCategory.next(res.data);
      }
    }, (err) => {
      this.categoryMessage = new Message('danger', err.errors);
    });
  }

  setEditCategory() {
    const category: Category = new Category(
      this.categoryForm.get('name').value,
      this.editCategory.name
    );

    this.categoryService.updateCategory(category, this.editCategory._id).subscribe((res: any) => {
      if (res) {
        this.categoryMessage = new Message('success', res.message);
      }
    }, (err) => {
      this.categoryMessage = new Message('danger', err.errors);
    });
  }

  checkCategoryEdit(): void {
    if (this.editCategory) {
      this.categoryForm.setValue({
        name: this.editCategory.name,
      });
    }
  }

  getControl(controlName) {
    return this.categoryForm.get(controlName);
  }

  getStatus(controlName) {
    return this.validationService.statusClass(this.getControl(controlName));
  }

  onClose(): void {
    this.categoryMessage.isOpen = false;
  }
}

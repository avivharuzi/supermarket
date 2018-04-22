import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validator } from '../../../models/validator.model';

import { ValidationService } from '../../../services/validation/validation.service';
import { AuthService } from '../../../services/auth/auth.service';

import { Message } from '../../../models/message.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  public orderForm: FormGroup;
  public orderMessage: Message;

  constructor(
    private validationService: ValidationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.createOrderForm();
    this.addUserDetailsToForm();
  }

  createOrderForm(): void {
    const city = new FormControl(null, [
      Validator.required('City')
    ]);

    const street = new FormControl(null, [
      Validator.required('Street')
    ]);

    const creditCard = new FormControl(null, [
      Validator.required('Credit card')
    ]);

    const shippingDate = new FormControl(new Date(), [
      Validator.required('Shipping date')
    ]);

    this.orderForm = new FormGroup({
      city,
      street,
      creditCard,
      shippingDate
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      //
    } else {
      this.validationService.dirtyAllInputs(this.orderForm);
    }
  }

  getControl(controlName: string): any {
    return this.orderForm.get(controlName);
  }

  getStatus(controlName: string): string {
    return this.validationService.statusClass(this.getControl(controlName));
  }

  resetOrderForm(): void {
    this.orderForm.patchValue({
      city: null,
      street: null,
      creditCard: null,
      shippingDate: new Date()
    });
    this.validationService.pristineAllInputs(this.orderForm);
  }

  onClose(): void {
    this.orderMessage.isOpen = false;
  }

  addUserDetailsToForm() {
    const userData = this.authService.userData;
    this.orderForm.patchValue({
      city: userData.city,
      street: userData.street
    });
  }
}

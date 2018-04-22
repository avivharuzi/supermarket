import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validator } from '../../../models/validator.model';

import { ValidationService } from '../../../services/validation/validation.service';
import { OrderService } from '../../../services/order/order.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';

import { Message } from '../../../models/message.model';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  public orderForm: FormGroup;
  public orderMessage: Message;
  public isOrderFinished: boolean;

  public mask = [/[1-9]/, /\d/, /\d/, /\d/, '-', /[1-9]/, /\d/, /\d/, /\d/, '-', /[1-9]/, /\d/, /\d/, /\d/, '-', /[1-9]/, /\d/, /\d/, /\d/];

  constructor(
    private validationService: ValidationService,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService
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
      const order: Order = new Order(
        this.getControl('city').value,
        this.getControl('street').value,
        this.getControl('creditCard').value,
        this.getControl('shippingDate').value.getTime()
      );

      this.orderService.setOrder(order).subscribe((res: any) => {
        this.cartService.resetCart();
        this.orderService.needToConfirm = true;
        this.orderService.recipe = res.data;
        this.cartService.getCart();
      }, err => {
        this.orderMessage = new Message('danger', err.errors);
      });
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

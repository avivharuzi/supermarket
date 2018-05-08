import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validator } from '../../../models/validator.model';

import { ValidationService } from '../../../services/validation/validation.service';
import { AuthService } from '../../../services/auth/auth.service';

import { Customer } from '../../../models/customer.model';
import { User } from '../../../models/user.model';
import { Message } from '../../../models/message.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  public registerForm: FormGroup;

  public registerMessage: Message;

  public step: number;

  constructor(
    private validationService: ValidationService,
    private authService: AuthService
  ) {
    this.step = 1;
  }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    const identityCard = new FormControl(null, [
      Validator.required('Identity card'),
      Validator.isNumericFloat()
    ]);

    const email = new FormControl(null, [
      Validator.required('Email'),
      Validator.isEmail()
    ]);

    const password = new FormControl(null, [
      Validator.required('Password'),
      Validator.isPassword()
    ]);

    const confirmPassword = new FormControl(null, [
      Validator.required('Confirm password'),
      Validator.isPassword()
    ]);

    const firstname = new FormControl(null, [
      Validator.required('First name'),
      Validator.isAlpha()
    ]);

    const lastname = new FormControl(null, [
      Validator.required('Last name'),
      Validator.isAlpha()
    ]);

    const city = new FormControl(null, [
      Validator.required('City'),
      Validator.isAlphaNumericSpace()
    ]);

    const street = new FormControl(null, [
      Validator.required('Street'),
      Validator.isAlphaNumericSpace()
    ]);

    this.registerForm = new FormGroup({
      'userDetails': new FormGroup({
        identityCard,
        email,
        password,
        confirmPassword
      }),
      'personalDetails': new FormGroup({
        firstname,
        lastname,
        city,
        street
      })
    });
  }

  back(): void {
    this.step = 1;
  }

  next(): void {
    if (this.checkPasswordConfirm() && this.registerForm.get('userDetails').valid) {
      this.checkdentityCardOrEmailExists().then(() => {
        this.registerMessage = null;
        this.step = 2;
      })
      .catch(err => this.registerMessage = new Message('danger', err.errors));
    } else {
      this.validationService.dirtyAllInputs(this.registerForm.get('userDetails'));
    }
  }

  getControl(group, control): any {
    return this.registerForm.get(group + '.' + control);
  }

  getStatus(group, control): string {
    return this.validationService.statusClass(this.getControl(group, control));
  }

  checkPasswordConfirm() {
    let password = this.getControl('userDetails', 'password');
    let confirmPassword = this.getControl('userDetails', 'confirmPassword');
    if ((!password.value && !confirmPassword.value) || (password.value !== confirmPassword.value)) {
      confirmPassword.setErrors({ 'passwordMatchError': 'Passwords are not matched' });
      return false;
    } else {
      confirmPassword.setErrors(null);
      return true;
    }
  }

  checkdentityCardOrEmailExists() {
    return new Promise((resolve, reject) => {
      let customer = {
        identityCard: this.getControl('userDetails', 'identityCard').value,
        email: this.getControl('userDetails', 'email').value,
      };

      this.authService.beforeRegister(customer).subscribe(res => {
        resolve(true);
      }, err => {
        reject(err);
      });
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const customer: Customer = new Customer(
        this.getControl('userDetails', 'identityCard').value,
        this.getControl('userDetails', 'email').value,
        this.getControl('userDetails', 'password').value,
        this.getControl('personalDetails', 'firstname').value,
        this.getControl('personalDetails', 'lastname').value,
        this.getControl('personalDetails', 'city').value,
        this.getControl('personalDetails', 'street').value
      );

      this.register(customer);
    } else {
      this.validationService.dirtyAllInputs(this.registerForm.get('personalDetails'));
    }
  }

  register(customer: Customer): void {
    this.authService.register(customer).subscribe((res: any) => {
      const user: User = new User(customer.email, customer.password);

      this.authService.login(user).subscribe();
    }, (err) => {
      this.registerMessage = new Message('danger', err.errors);
    });
  }

  onClose(): void {
    this.registerMessage.isOpen = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validator } from '../../../models/validator.model';
import { ValidationService } from '../../../services/validation/validation.service';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;

  public messageType: string;
  public loginMessage: string;

  constructor(
    private validationService: ValidationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(): void {
    const email = new FormControl(null, [
      Validator.required('Email')
    ]);

    const password = new FormControl(null, [
      Validator.required('Password')
    ]);

    this.loginForm = new FormGroup({
      email,
      password
    });
  }

  getControl(control) {
    return this.loginForm.get(control);
  }

  getStatus(control) {
    return this.validationService.statusClass(this.getControl(control));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user: User = new User(
        this.getControl('email').value,
        this.getControl('password').value
      );

      this.login(user);
    } else {
      this.validationService.dirtyAllInputs(this.loginForm);
    }
  }

  login(user: User): void {
    this.authService.login(user).subscribe((res: any) => {
      this.loginForm.reset();
    }, (err) => {
      this.loginMessage = err.errors;
      this.messageType = 'danger';
    });
  }
}

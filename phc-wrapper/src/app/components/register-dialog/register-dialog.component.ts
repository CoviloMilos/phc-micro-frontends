import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserCreate } from 'src/app/_models/user.create';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  user: UserCreate = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    admin: '',
    password: ''
  };

  minCharsLen = 8;
  maxCharsLen = 16;

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<RegisterDialogComponent>,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.initReactiveForm();
  }

  initReactiveForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(this.minCharsLen), Validators.maxLength(this.maxCharsLen)]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      admin: ['False']
    // tslint:disable-next-line: no-use-before-declare
    }, {validator: passwordMatchValidator});
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.user.first_name = this.registerForm.value.firstName;
      this.user.last_name = this.registerForm.value.lastName;
      this.user.email = this.registerForm.value.email;
      this.user.username = this.registerForm.value.username;
      this.user.admin = this.registerForm.value.admin;
      this.user.password = this.registerForm.value.password;

      this.authService.registerUser(this.user)
        .subscribe(() => {
          this.alertifyService.success('Successful registartion!');
          this.dialogRef.close();
        }, (error) => {
          if (error.status === 422) {
            this.alertifyService.error('User with ' + this.user.username + ' username already exists!');
          } else {
            this.alertifyService.error('Failed registartion. Please try later again.');
            this.dialogRef.close();
          }
        });
    }
  }

  onPasswordInput() {
    if (this.registerForm.hasError('passwordMismatch')) {
      this.formConfirmPassword.setErrors([{passwordMismatch: true}]);
    } else {
      this.formConfirmPassword.setErrors(null);
    }
  }

  get formPassword() { return this.registerForm.get('password'); }
  get formConfirmPassword() { return this.registerForm.get('confirmPassword'); }

  public errorHandling = (control: string, error: string) => {
    return this.registerForm.controls[control].hasError(error);
  }

}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('confirmPassword').value) {
    return null;
  } else {
    return {passwordMismatch: true};
  }
};

import { AlertifyService } from 'src/app/_services/alertify.service';
import { UsersService } from './../../../_services/users.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { UserCreate } from 'src/app/_models/user.create';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent implements OnInit {

  user: UserCreate = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    admin: '',
    password: ''
  };
  
  minCharsLen: number = 8;
  maxCharsLen: number = 16;

  createForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private dialogRef: MatDialogRef<CreateUserDialogComponent>,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.initReactiveForm();
  }

  initReactiveForm() {
    this.createForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(this.minCharsLen), Validators.maxLength(this.maxCharsLen)]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required]],
      admin: ['False']
    }, {validator: passwordMatchValidator});
  }

  submitForm() {
    if (this.createForm.valid) {
      this.user.first_name = this.createForm.value.firstName;
      this.user.last_name = this.createForm.value.lastName;
      this.user.email = this.createForm.value.email;
      this.user.username = this.createForm.value.username;
      this.user.admin = this.createForm.value.admin;    
      this.user.password = this.createForm.value.password;  
      
      this.usersService.createUser(this.user)
        .subscribe((res) => {
          console.log(res);
          this.alertifyService.success('User added successfully!');
        }, (error: HttpErrorResponse) => {
          this.alertifyService.error('Error trying to create user. Error name: ' + error.name + '. Error message: ' + error.message + '.');
        });

      this.createForm.reset();
      this.dialogRef.close(this.user);
    }
  }

  onPasswordInput() { 
    if (this.createForm.hasError('passwordMismatch')) 
      this.formConfirmPassword.setErrors([{'passwordMismatch': true}]);
    else
      this.formConfirmPassword.setErrors(null);
  }

  get formPassword() { return this.createForm.get('password'); }
  get formConfirmPassword() { return this.createForm.get('confirmPassword'); } 

  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }

}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('confirmPassword').value)
    return null;
  else
    return {passwordMismatch: true};
};
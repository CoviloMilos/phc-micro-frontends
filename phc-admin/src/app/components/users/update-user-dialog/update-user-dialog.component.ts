
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { UserCreate } from 'src/app/_models/user.create';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/_models/user';
import { UserUpdate } from 'src/app/_models/user.update';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {
  user: UserUpdate = Object.create(null);

  minCharsLen = 8;
  maxCharsLen = 16;

  updateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private dialogRef: MatDialogRef<UpdateUserDialogComponent>,
              private alertifyService: AlertifyService,
              @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit() {
    this.initreactiveForm();
  }

  initreactiveForm() {
    this.updateForm = this.formBuilder.group({
      firstName: [this.data.first_name],
      lastName: [this.data.last_name],
      email: [this.data.email],
      username: [this.data.username],
      newPassword: ['', [Validators.minLength(this.minCharsLen), Validators.maxLength(this.maxCharsLen)]],
      newConfirmPassword: [''],
      admin: [this.data.admin],
    // tslint:disable-next-line: no-use-before-declare
    }, {validator: passwordMatchValidator});
  }

  submitForm() {
    if (this.updateForm.valid) {

      this.user.first_name = this.updateForm.value.firstName;
      this.user.last_name = this.updateForm.value.lastName;
      this.user.email = this.updateForm.value.email;
      this.user.username = this.updateForm.value.username;
      this.user.admin = this.updateForm.value.admin;
      // tslint:disable-next-line: triple-equals
      if (this.updateForm.value.newPassword != '') {
        this.user.password = this.updateForm.value.newPassword;
      } else {
        delete this.user.password;
      }


      this.usersService.updateUser(this.data.user_id, this.user)
          .subscribe((res) => {
            this.alertifyService.success('User updated successfully!');
          }, (error: HttpErrorResponse) => {
            this.alertifyService.error('Could not update user! Error name: ' + error.name + '. Error message: ' + error.message + '.');
          });

      this.updateForm.reset();
      this.dialogRef.close();
    }
  }

  onPasswordInput() {
    if (this.updateForm.hasError('passwordMismatch')) {
      this.formConfirmPassword.setErrors([{passwordMismatch: true}]);
    } else {
      this.formConfirmPassword.setErrors(null);
    }
  }

  get formPassword() { return this.updateForm.get('newPassword'); }
  get formConfirmPassword() { return this.updateForm.get('newConfirmPassword'); }

  public errorHandling = (control: string, error: string) => {
    return this.updateForm.controls[control].hasError(error);
  }

}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('newPassword').value === formGroup.get('newConfirmPassword').value) {
    return null;
  } else {
    return {passwordMismatch: true};
  }
};

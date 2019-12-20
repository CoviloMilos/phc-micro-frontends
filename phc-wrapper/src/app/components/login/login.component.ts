import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/_models/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { MatDialog } from '@angular/material';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login = {
    username: '',
    password: ''
  };

  loginForm: FormGroup;
  minCharsLen = 8;
  submitted = false;

  constructor(public formBuilder: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialog) { }

  ngOnInit() {
    this.initReactiveForm();
  }

  initReactiveForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(this.minCharsLen)]]
    });
  }

  submitForm() {

    if (this.loginForm.valid) {
      this.user.username = this.loginForm.value.username;
      this.user.password = this.loginForm.value.password;

      if (this.authService.login(this.user)) {
        this.submitted = true;
      } else {
        this.submitted = false;
      }

    }
  }

  openRegisterDialog() {
    const dialogRef = this.dialogRef.open(RegisterDialogComponent, {
      height: '700px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe();
  }

  errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  }
}

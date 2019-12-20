import { RegisterDialogComponent } from './../register-dialog/register-dialog.component';
import { AlertifyServiceMock } from './../../../testing/mock/alertify.service.mock';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatCardModule, MatInputModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [
        LoginComponent,
        RegisterDialogComponent
      ],
      providers: [
        { provide: AlertifyService, useClass: AlertifyServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form valid', () => {
    component.loginForm.controls.username.setValue('username');
    component.loginForm.controls.password.setValue('password');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should have form invalid when empty', () => {
    component.loginForm.controls.username.setValue('');
    component.loginForm.controls.password.setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should have username field valid', () => {
    const username = component.loginForm.controls.username;
    expect(username.valid).toBeFalsy();

    let errors = {};
    errors = username.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeTruthy();

  });

  it('should have password field greather than 7 chars', () => {
    component.loginForm.controls.password.setValue('password');
    expect(component.loginForm.get('password').value.length).toBeGreaterThan(7);
  });

  it('should send credentials on submit', () => {
    fixture.detectChanges();

    component.loginForm.controls.username.setValue('admin');
    component.loginForm.controls.password.setValue('adminadm');
    component.submitForm();

    expect(component.submitted).toEqual(true);
  });

});

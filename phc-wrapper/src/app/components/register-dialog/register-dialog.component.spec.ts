import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDialogComponent } from './register-dialog.component';
import { MatFormFieldModule, MatInputModule, MatDialogRef } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('RegisterDialogComponent', () => {
  let component: RegisterDialogComponent;
  let fixture: ComponentFixture<RegisterDialogComponent>;

  function initForm() {
    component.registerForm.controls.firstName.setValue('fName');
    component.registerForm.controls.lastName.setValue('lName');
    component.registerForm.controls.username.setValue('username');
    component.registerForm.controls.password.setValue('password');
    component.registerForm.controls.confirmPassword.setValue('password');
    component.registerForm.controls.email.setValue('email@email.com');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,

      ],
      declarations: [ RegisterDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: RegisterDialogComponent }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form valid with valid inputs', () => {
    initForm();
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should have form invalid when even one field is invalid', () => {
    initForm();
    component.registerForm.controls.email.setValue('emailemail.com');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should have form invalid when passwords do not match', () => {
    initForm();
    component.registerForm.controls.confirmPassword.setValue('passwordd');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should have form invalid when password has less than 8 chars', () => {
    initForm();
    component.registerForm.controls.password.setValue('pass');
    component.registerForm.controls.confirmPassword.setValue('pass');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should call errorHandling() method when field is not valid', () => {
    const errorHandlingSpy = spyOn(component, 'errorHandling');
    initForm();
    component.registerForm.controls.username.setValue('');

    fixture.detectChanges();
    expect(errorHandlingSpy).toHaveBeenCalled();
  });

  it('should call onPasswordInput() method when confirm password field is filled', (done) => {
    const onPasswordInputSpy = spyOn(component, 'onPasswordInput');
    initForm();
    const input = fixture.debugElement.queryAll(By.css('input'))[5];
    const el = input.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      el.value = 'password';
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.value).toBe(component.registerForm.controls.confirmPassword.value);
      expect(onPasswordInputSpy).toHaveBeenCalled();
      done();
    });
  });

  it('should call submitForm() on click submit button', (done) => {
    const submitFormSpy = spyOn(component, 'submitForm');
    initForm();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.registerForm.valid).toBeTruthy();
      expect(submitFormSpy).toHaveBeenCalled();
      done();
    });
  });

});

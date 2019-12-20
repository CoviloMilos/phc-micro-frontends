import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CreateUserDialogComponent } from './create-user-dialog.component';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatDialogRef } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AlertifyServiceMock } from 'src/testing/mock/alertify.service.mock';

describe('CreateUserDialogComponent', () => {
  let component: CreateUserDialogComponent;
  let fixture: ComponentFixture<CreateUserDialogComponent>;

  function initForm() {
    component.createForm.controls['email'].setValue('email');
    component.createForm.controls['admin'].setValue('False');
    component.createForm.controls['username'].setValue('username');
    component.createForm.controls['lastName'].setValue('lastName');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserDialogComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatRadioModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: CreateUserDialogComponent },
        { provide: AlertifyService, useClass: AlertifyServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form valid', () => {
    component.createForm.controls['firstName'].setValue('firstName');
    component.createForm.controls['password'].setValue('password');
    component.createForm.controls['confirmPassword'].setValue('password');
    initForm();
    expect(component.createForm.valid).toBeTruthy();
  });

  it('should have form invalid when one filed is empty', () => {
    component.createForm.controls['firstName'].setValue('');
    component.createForm.controls['password'].setValue('password');
    component.createForm.controls['confirmPassword'].setValue('password');
    initForm();
    expect(component.createForm.valid).toBeFalsy();
  });

  it('should have form invalid when passwords do not match', () => {
    component.createForm.controls['firstName'].setValue('firstName');
    component.createForm.controls['password'].setValue('password');
    component.createForm.controls['confirmPassword'].setValue('password11');
    initForm();
    expect(component.createForm.valid).toBeFalsy();
  });

  it('should have form invalid when password has less than 8 chars', () => {
    component.createForm.controls['firstName'].setValue('firstName');
    component.createForm.controls['password'].setValue('pass');
    component.createForm.controls['confirmPassword'].setValue('pass');
    initForm();
    expect(component.createForm.valid).toBeFalsy();
  });

  it('should have form invalid when password has less than 16 chars', () => {
    component.createForm.controls['firstName'].setValue('firstName');
    component.createForm.controls['password'].setValue('passwordpasswordpass');
    component.createForm.controls['confirmPassword'].setValue('passwordpasswordpass');
    initForm();
    expect(component.createForm.valid).toBeFalsy();
  });

  it('should call errorHandling() method when field is not valid', () => {
    spyOn(component, 'errorHandling');
    component.createForm.controls['firstName'].setValue('');
    component.createForm.controls['password'].setValue('password');
    component.createForm.controls['confirmPassword'].setValue('password');
    initForm();

    fixture.detectChanges();
    expect(component.errorHandling).toHaveBeenCalled();
  });

  it('should call onPasswordInput() method when confirm password field is filled', (done) => {
    spyOn(component, 'onPasswordInput');
    component.createForm.controls['firstName'].setValue('firstName');
    component.createForm.controls['password'].setValue('password');
    component.createForm.controls['confirmPassword'].setValue('password');
    initForm();
    let input = fixture.debugElement.queryAll(By.css('input'))[5];
    let el = input.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      el.value = 'password';
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.value).toBe(component.createForm.controls['confirmPassword'].value);
      expect(component.onPasswordInput).toHaveBeenCalled();
      done();
    });
  });

  it('should call submitForm() on click submit button', (done) => {
    spyOn(component, 'submitForm');
    component.createForm.controls['firstName'].setValue('firstName');
    component.createForm.controls['password'].setValue('password');
    component.createForm.controls['confirmPassword'].setValue('password');
    initForm();
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.createForm.valid).toBeTruthy();
      expect(component.submitForm).toHaveBeenCalled();
      done();
    });
  });

});

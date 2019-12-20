import { AlertifyServiceMock } from './../../../../testing/mock/alertify.service.mock';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UpdateUserDialogComponent } from './update-user-dialog.component';
import { User } from 'src/app/_models/user';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdateUserDialogComponent', () => {
  let component: UpdateUserDialogComponent;
  let fixture: ComponentFixture<UpdateUserDialogComponent>;
  const user: User = {
    admin: 'True',
    email: 'email',
    first_name: 'value1',
    last_name: 'value2',
    user_id: 54,
    username: 'username'
  };

  function initForm() {
    component.updateForm.controls.firstName.setValue(user.first_name);
    component.updateForm.controls.newPassword.setValue('password');
    component.updateForm.controls.newConfirmPassword.setValue('password');
    component.updateForm.controls.email.setValue(user.email);
    component.updateForm.controls.admin.setValue(user.admin);
    component.updateForm.controls.username.setValue(user.username);
    component.updateForm.controls.lastName.setValue(user.last_name);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUserDialogComponent ],
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
        { provide: MatDialogRef, useValue: UpdateUserDialogComponent},
        { provide: MAT_DIALOG_DATA, useValue: user},
        { provide: AlertifyService, useClass: AlertifyServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form valid', () => {
    initForm();
    expect(component.updateForm.valid).toBeTruthy();
  });

  it('should have form valid when some field is empty', () => {
    initForm();
    component.updateForm.controls.lastName.setValue('');
    expect(component.updateForm.valid).toBeTruthy();
  });

  it('should have 7 form fields and 1 radio button', () => {
      const formControls = fixture.debugElement.queryAll(By.css('mat-form-field'));
      const radioButton = fixture.debugElement.queryAll(By.css('mat-radio-group'));
      expect(formControls.length).toBe(6);
      expect(radioButton.length).toBe(1);
  });

  it('should call submitForm() on click submit button', (done) => {
    spyOn(component, 'submitForm');
    initForm();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.updateForm.valid).toBeTruthy();
      expect(component.submitForm).toHaveBeenCalled();
      done();
    });
  });

});

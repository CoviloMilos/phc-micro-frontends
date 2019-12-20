import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterPlantComponent } from './../home/register-plant/register-plant.component';
// tslint:disable-next-line: max-line-length
import { MatCardModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatGridListModule, MatSelectModule, MatDatepickerModule, MatRadioModule, MatNativeDateModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AlertifyServiceMock } from 'src/testing/mock/alertify.service.mock';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  function initForm() {
    component.profileForm.controls.username.setValue('user');
    component.profileForm.controls.firstName.setValue('ime');
    component.profileForm.controls.lastName.setValue('przime');
    component.profileForm.controls.email.setValue('email@');
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatInputModule,
        MatDialogModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatGridListModule,
        MatSelectModule,
        MatDatepickerModule,
        MatRadioModule,
        MatNativeDateModule
      ],
      declarations: [
        ProfileComponent,
        RegisterPlantComponent
       ],
      providers: [
        { provide: AlertifyService, useClass: AlertifyServiceMock },
        { provide: JwtHelperService, useClass: AlertifyServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line: max-line-length
    component.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTA3IiwiZmlyc3RfbmFtZSI6Ik1pbG9zIiwibGFzdF9uYW1lIjoiQ292aWxvIiwidXNlcm5hbWUiOiJtY292aWxvIiwiZW1haWwiOiJtaWxvcy5jb3ZpbG9AZGV2b3RlYW0uY29tIiwiYWRtaW4iOiJUcnVlIiwiZXhwIjoxNTc0ODY3MjM2fQ.VOMVE2ZAESsUfIKNqeydQlhx6KViUWJZtgy7cNsFunQ';
    component.ngOnInit();
    initForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form valid', () => {
    component.profileForm.controls.username.setValue('username');
    expect(component.profileForm.valid).toBeTruthy();
  });

  it('should have form invalid if at least one field is invalid', () => {
    component.profileForm.controls.username.setValue('');
    expect(component.profileForm.valid).toBeFalsy();
  });

  it('should call submitForm() on click submit button', (done) => {
    spyOn(component, 'submitForm');
    initForm();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.submitForm).toHaveBeenCalled();
      done();
    });
  });

});

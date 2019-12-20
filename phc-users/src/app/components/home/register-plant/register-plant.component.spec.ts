import { AlertifyServiceMock } from './../../../../testing/mock/alertify.service.mock';
import { MatCardModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatRadioModule, MatNativeDateModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPlantComponent } from './register-plant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertifyService } from 'src/app/_services/alertify.service';

describe('RegisterPlantComponent', () => {
  let component: RegisterPlantComponent;
  let fixture: ComponentFixture<RegisterPlantComponent>;

  function initForm() {
    component.plantForm.controls['plant'].setValue('Dracaena');
    component.plantForm.controls['emailNotification'].setValue('True');
    component.plantForm.controls['date'].setValue('09-09-2019');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,  
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatRadioModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatNativeDateModule,
        BrowserAnimationsModule
      ],
      declarations: [ RegisterPlantComponent ],
      providers: [
        {provide: AlertifyService, useClass: AlertifyServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    initForm();
    expect(component).toBeTruthy();
  });

  it('should have form invalid', () => {
    initForm();
    component.plantForm.controls['plant'].setValue('');
    expect(component.plantForm.valid).toBeFalsy();
  });

  it('should call initPlantForm on ngOnInit', () => {
    let spy = spyOn(component, 'initPlantForm');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  })

  it('should call errorHandling() method when field is not valid', () => {
    let spy = spyOn(component, 'errorHandling');
    initForm();
    component.plantForm.controls['plant'].setValue('');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

});

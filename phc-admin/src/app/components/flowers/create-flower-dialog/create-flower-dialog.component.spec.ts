import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlowerDialogComponent } from './create-flower-dialog.component';
import { MatFormFieldModule, MatInputModule, MatDialogRef } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateFlowerDialogComponent', () => {
  let component: CreateFlowerDialogComponent;
  let fixture: ComponentFixture<CreateFlowerDialogComponent>;

  function initForm() {
    component.createForm.controls.nameSer.setValue('nameSer');
    component.createForm.controls.nameLat.setValue('nameLat');
    component.createForm.controls.wateringPeriod.setValue('5');
    component.createForm.controls.description.setValue('description');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFlowerDialogComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: CreateFlowerDialogComponent}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFlowerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form valid', () => {
    initForm();
    expect(component.createForm.valid).toBeTruthy();
  });

  it('should have form invalid when one filed is empty', () => {
    initForm();
    component.createForm.controls.nameSer.setValue('');
    expect(component.createForm.valid).toBeFalsy();
  });

  it('should convert watering period input to number', () => {
    initForm();
    expect(Number(component.createForm.controls.wateringPeriod.value)).toEqual(5);
  });

  it('should call errorHandling() method when field is not valid', () => {
    spyOn(component, 'errorHandling');
    initForm();
    component.createForm.controls.wateringPeriod.setValue('');
    fixture.detectChanges();
    expect(component.errorHandling).toHaveBeenCalled();
  });

  it('should call submitForm() on click submit button', (done) => {
    spyOn(component, 'submitForm');
    initForm();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.createForm.valid).toBeTruthy();
      expect(component.submitForm).toHaveBeenCalled();
      done();
    });
  });

});

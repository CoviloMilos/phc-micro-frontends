import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateFlowerDialogComponent } from './update-flower-dialog.component';
import { Flower } from 'src/app/_models/flower';
import { MatFormFieldModule, MatInputModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('UpdateFlowerDialogComponent', () => {
  let component: UpdateFlowerDialogComponent;
  let fixture: ComponentFixture<UpdateFlowerDialogComponent>;
  const flower: Flower = {
    flower_id: '5',
    watering_period: 6,
    description: 'flowers description',
    name_lat: 'name on lat',
    name_ser: 'name on ser'
  };

  function initForm() {
    component.updateForm.controls.nameSer.setValue(flower.name_ser);
    component.updateForm.controls.nameLat.setValue(flower.name_lat);
    component.updateForm.controls.wateringPeriod.setValue(flower.watering_period);
    component.updateForm.controls.description.setValue(flower.description);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFlowerDialogComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: UpdateFlowerDialogComponent},
        {  provide: MAT_DIALOG_DATA, useValue: flower }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFlowerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form valid when some field is empty', () => {
    initForm();
    component.updateForm.controls.nameLat.setValue('');
    expect(component.updateForm.valid).toBeTruthy();
  });

  it('should have 4 form fields', () => {
    const formControls = fixture.debugElement.queryAll(By.css('mat-form-field'));
    expect(formControls.length).toBe(4);
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

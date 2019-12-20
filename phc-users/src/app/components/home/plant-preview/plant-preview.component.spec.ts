import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantPreviewComponent } from './plant-preview.component';

describe('PlantPreviewComponent', () => {
  let component: PlantPreviewComponent;
  let fixture: ComponentFixture<PlantPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantPreviewComponent ],
      imports: [
        MatCardModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: PlantPreviewComponent },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
